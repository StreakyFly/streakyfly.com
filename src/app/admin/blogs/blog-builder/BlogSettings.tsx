'use client';

import { useBlogStore } from '@/stores/useBlogStore';
import { BlogStatus } from '@/types/blog';

export default function BlogSettings() {
    const { blog } = useBlogStore();

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                    value={blog.slug}
                    onChange={(e) => useBlogStore.setState(state => {
                        state.blog.slug = e.target.value;
                    })}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    value={blog.status}
                    onChange={(e) => useBlogStore.setState(state => {
                        state.blog.status = e.target.value as BlogStatus;
                    })}
                    className="w-full p-2 border rounded"
                >
                    {Object.values(BlogStatus).map((status) => (
                        <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <input
                    value={blog.coverImage}
                    onChange={(e) => useBlogStore.setState(state => {
                        state.blog.coverImage = e.target.value;
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="Image URL"
                />
            </div>
        </div>
    );
}