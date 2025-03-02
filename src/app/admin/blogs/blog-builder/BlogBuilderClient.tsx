'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog, updateBlog } from '@/actions/blogActions';
import { revalidate } from '@/actions/revalidate';
import { useBlogStore } from '@/stores/useBlogStore';
import { CldImage } from '@/components/CldWrapper';
import { BlogState, BlogStatus } from '@/types/blog';
import EditableBlogComponentRenderer from '@/components/blog/EditableBlogComponentRenderer';
import { componentRegistry } from '@/components/blog/components';
import { ComponentUnion } from '@/types/component';

export default function BlogBuilder({ initialData }: {
    initialData?: BlogState | null
}) {
    const router = useRouter();
    const {
        blog,
        setBlog,
        addComponent,
        updateComponent,
        resetBlog
    } = useBlogStore();
    const [isSaving, setIsSaving] = useState(false);
    const [editingComponentId, setEditingComponentId] = useState<string | null>(null);

    const selectedComponent = blog.components.find(c => c.id === editingComponentId);

    // Initialize store
    useEffect(() => {
        initialData ? setBlog(initialData) : resetBlog();
        return () => resetBlog();
    }, [initialData, setBlog, resetBlog]);

    // Click-outside handler
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && e.target.tagName == 'MAIN') {
                setEditingComponentId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let result;
            const currentBlog = useBlogStore.getState().blog;

            if (initialData?.slug) {
                // Update existing blog
                result = await updateBlog(initialData.slug, currentBlog);
            } else {
                // Create new blog
                result = await createBlog(currentBlog);
            }

            if (!result.success) {
                throw new Error(result.error);
            } else {
                await Promise.all([
                    revalidate('/blogs'),
                    revalidate(`/blogs/${result.slug}`)
                ]);
                router.push('/admin/blogs');
            }

        } catch (error) {
            console.error('Failed to save blog:', error);
            alert(`Failed to save blog: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Top Bar */}
            <header className="bg-neutral-800 border-b p-4">
                <div className="flex gap-4 text-black">
                    {/* Blog Title */}
                    <input
                        type="text"
                        value={blog.title}
                        onChange={(e) => useBlogStore.setState(s => ({ blog: { ...s.blog, title: e.target.value } }))}
                        placeholder="Blog title"
                        className="text-xl font-bold flex-1 p-2 border rounded"
                    />
                    {/* Blog Description */}
                    <input
                        type="text"
                        value={blog.description}
                        onChange={(e) => useBlogStore.setState(s => ({ blog: { ...s.blog, description: e.target.value } }))}
                        placeholder="Description"
                        className="flex-1 p-2 border rounded"
                    />
                    {/* Blog Cover image */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Cover Image</label>
                        <input
                            type="url"
                            value={blog.coverImage}
                            onChange={(e) => useBlogStore.setState(s => ({
                                blog: { ...s.blog, coverImage: e.target.value }
                            }))}
                            placeholder="Enter image URL"
                            className="w-64 p-2 border rounded text-black"
                        />
                    </div>
                    {/* Blog Slug */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Slug</label>
                        <input
                            type="text"
                            value={blog.slug}
                            onChange={(e) => useBlogStore.setState(s => ({
                                blog: { ...s.blog, slug: e.target.value }
                            }))}
                            placeholder="Enter slug"
                            className="w-64 p-2 border rounded text-black"
                        />
                    </div>
                    {/* Blog Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Status</label>
                        <select
                            value={blog.status}
                            onChange={(e) => useBlogStore.setState(s => ({
                                blog: { ...s.blog, status: e.target.value as BlogStatus }
                            }))}
                            className="p-2 border rounded text-black"
                        >
                            <option value="draft">Draft</option>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                    {/* Save Button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>

                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar - Components */}
                <aside className="w-64 border-r bg-neutral-800 p-4 flex flex-col gap-2">
                    <button
                        onClick={() => addComponent({
                            id: crypto.randomUUID(),
                            type: 'paragraph',
                            text: 'Enter your text here...',
                        })}
                        className="p-2 w-full text-left hover:bg-neutral-900 rounded"
                    >
                        + Add Paragraph
                    </button>
                    <button
                        onClick={() => addComponent({
                            id: crypto.randomUUID(),
                            type: 'image',
                            src: 'cld-sample',
                            alt: '',
                        })}
                        className="p-2 w-full text-left hover:bg-neutral-900 rounded"
                    >
                        + Add Image
                    </button>
                </aside>

                {/* Main Content - Editable Preview */}
                <main
                    className="flex-1 overflow-auto p-8 bg-neutral-900 text-white"
                    data-editable
                >
                    <div className="max-w-3xl mx-auto">
                        {/* Cover Image */}
                        {blog.coverImage && (
                            <div className="mb-8">
                                <CldImage
                                    src={blog.coverImage}
                                    alt="Cover image"
                                    width={1200}
                                    height={630}
                                    className="rounded-lg"
                                />
                            </div>
                        )}

                        {/* Components */}
                        <EditableBlogComponentRenderer
                            editingComponentId={editingComponentId}
                            setEditingComponentId={setEditingComponentId}
                        />

                        {blog.components.length === 0 && (
                            <div className="text-center text-gray-500 p-8">
                                Start adding components from the left sidebar
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Sidebar - Settings */}
                <aside className="w-64 border-l bg-neutral-800 p-4">
                    {selectedComponent ? (
                        <div className="space-y-4">
                            <h3 className="font-medium text-white mb-4">Component Settings</h3>
                            {(() => {
                                const ComponentSettings = componentRegistry[selectedComponent.type].Settings;
                                return (
                                    <ComponentSettings
                                        component={selectedComponent}
                                        onUpdateAction={(updates: Partial<ComponentUnion>) => {
                                            updateComponent(selectedComponent.id, updates);
                                        }}
                                    />
                                );
                            })()}
                        </div>
                    ) : (
                        <div className="text-gray-400 text-sm">
                            Select a component to edit its settings
                        </div>
                    )}
                </aside>

            </div>
        </div>
    );
}
