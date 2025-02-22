'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog, updateBlog } from '@/actions/blogActions';
import { revalidate } from '@/actions/revalidate';
import type { ComponentUnion } from '@/database/models/Component';
import { BlogFormData } from '@/types/blog';
import BlogComponentRenderer from '@/components/blog/BlogComponentRenderer';
import { FiEye, FiEyeOff, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CldImage } from '@/components/CldWrapper';

const INITIAL_BLOG_STATE: BlogFormData = {
    title: '',
    description: '',
    coverImage: '',
    slug: '',
    components: [],
    status: 'draft',
    tags: [],
}

export default function BlogBuilder({ initialData }: {
    initialData?: BlogFormData | null
}) {
    const router = useRouter();
    const [blog, setBlog] = useState<BlogFormData>(initialData || INITIAL_BLOG_STATE);
    const [isSaving, setIsSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [previewWidth, setPreviewWidth] = useState<'33%' | '50%' | '66%'>('50%');

    // Initialize form with existing data if editing
    useEffect(() => {
        if (initialData) {
            setBlog(initialData);
        }
    }, [initialData]);

    const addComponent = (type: ComponentUnion['type']) => {
        const newComponent: ComponentUnion = type === 'paragraph'
            ? { id: crypto.randomUUID(), type, text: '' }
            : { id: crypto.randomUUID(), type, src: '', alt: '' };

        setBlog(prev => ({
            ...prev,
            components: [...prev.components, newComponent]
        }));
    };

    const updateComponent = (id: string, updates: Partial<ComponentUnion>) => {
        setBlog(prev => ({
            ...prev,
            components: prev.components.map(comp =>
                comp.id === id ? {
                    ...comp,
                    ...updates
                } as ComponentUnion : comp
            )
        }));
    };

    const deleteComponent = (id: string) => {
        setBlog(prev => ({
            ...prev,
            components: prev.components.filter(comp => comp.id !== id)
        }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let result;
            if (initialData) {
                // Update existing blog
                result = await updateBlog(initialData.slug, blog);
            } else {
                // Create new blog
                result = await createBlog(blog);
            }

            if (result?.success) {
                await Promise.all([
                    revalidate('/blogs'),
                    revalidate(`/blogs/${result.slug}`)
                ]);
                router.push('/admin/blogs');
            }
        } catch (error) {
            console.error('Save failed:', error);
            alert(`Failed to save blog: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <div className="relative h-screen flex">
            {/* Editor Panel */}
            <div className={`h-full overflow-y-auto p-6 transition-all duration-300 ${showPreview ? 'w-1/2' : 'w-full'} bg-gray-900`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Blog Builder</h1>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowPreview(!showPreview)}
                            className="p-2 hover:bg-gray-800 rounded-full text-white"
                            title={showPreview ? 'Hide preview' : 'Show preview'}
                        >
                            {showPreview ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Basic Metadata */}
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-sm font-medium">Title</span>
                            <input
                                type="text"
                                value={blog.title}
                                onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full p-2 border rounded bg-gray-700"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Description</span>
                            <textarea
                                value={blog.description}
                                onChange={(e) => setBlog(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full p-2 border rounded h-24 bg-gray-700"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Cover Image URL</span>
                            <input
                                type="text"
                                value={blog.coverImage}
                                onChange={(e) => setBlog(prev => ({ ...prev, coverImage: e.target.value }))}
                                className="w-full p-2 border rounded bg-gray-700"
                            />
                        </label>
                    </div>

                    {/* Component Builder */}
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => addComponent('paragraph')}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Add Paragraph
                            </button>
                            <button
                                type="button"
                                onClick={() => addComponent('image')}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Add Image
                            </button>
                        </div>

                        {blog.components.map((component) => (
                            <div key={component.id} className="border p-4 rounded-lg">
                                {component.type === 'paragraph' ? (
                                    <div className="space-y-2">
                      <textarea
                          value={component.text}
                          onChange={(e) => updateComponent(component.id, { text: e.target.value })}
                          className="w-full p-2 border rounded h-32 bg-gray-700"
                          placeholder="Enter paragraph text..."
                      />
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={component.src}
                                            onChange={(e) => updateComponent(component.id, { src: e.target.value })}
                                            placeholder="Image URL"
                                            className="w-full p-2 border rounded bg-gray-700"
                                        />
                                        <input
                                            type="text"
                                            value={component.alt}
                                            onChange={(e) => updateComponent(component.id, { alt: e.target.value })}
                                            placeholder="Alt text"
                                            className="w-full p-2 border rounded bg-gray-700"
                                        />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => deleteComponent(component.id)}
                                    className="mt-2 text-red-600 text-sm"
                                >
                                    Delete Component
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-2 bg-primary text-white rounded disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save Blog'}
                        </button>
                    </div>
                </form>

                {/* Debug JSON Preview */}
                <details className="mt-12">
                    <summary className="cursor-pointer text-sm text-gray-600">JSON Preview</summary>
                    <pre className="mt-2 p-4 bg-gray-800 rounded text-xs overflow-x-auto">
              {JSON.stringify(blog, null, 2)}
            </pre>
                </details>
            </div>

            {/* Preview Panel */}
            {showPreview && (
                <div className={`h-full overflow-y-auto p-6 bg-gray-800 transition-all duration-300 ${
                    previewWidth === '33%' ? 'w-1/3' :
                        previewWidth === '66%' ? 'w-2/3' : 'w-1/2'
                }`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Preview</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPreviewWidth('33%')}
                                className={`p-2 rounded ${previewWidth === '33%' ? 'bg-gray-700' : 'bg-gray-800'} text-white`}
                            >
                                <FiChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPreviewWidth('50%')}
                                className={`p-2 rounded ${previewWidth === '50%' ? 'bg-gray-700' : 'bg-gray-800'} text-white`}
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <article className="prose max-w-none text-white">
                        <h1 className="text-white">{blog.title}</h1>
                        {blog.coverImage && (
                            <CldImage src={blog.coverImage} alt="cover image alt" width="512" height="512" style={{ width: "auto", height: "auto" }} />
                        )}
                        <p className="text-lg text-gray-300">{blog.description}</p>
                        <BlogComponentRenderer components={blog.components} />
                    </article>
                </div>
            )}
        </div>
    );
}
