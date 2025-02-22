'use client';

import { useState } from 'react';
import { blogActions } from '@/actions';

export default function DeleteButton({ slug, onDelete }: { slug: string; onDelete: () => void }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;

        setIsDeleting(true);
        try {
            await blogActions.deleteBlog(slug);
            onDelete(); // Trigger parent's update
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete blog');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:underline disabled:opacity-50"
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
