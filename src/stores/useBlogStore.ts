import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { BlogState, BlogStatus } from '@/types/blog';
import { ComponentUnion } from '@/types/component';

type BlogStore = {
    // State
    blog: BlogState;

    // Actions
    setBlog: (blog: BlogState) => void;
    resetBlog: () => void;
    addComponent: (component: ComponentUnion) => void;
    updateComponent: (id: string, updates: Partial<ComponentUnion>) => void;
    deleteComponent: (id: string) => void;
};

const initialState: BlogState = {
    title: '',
    description: '',
    coverImage: '',
    slug: '',
    status: BlogStatus.Draft,
    types: [],
    tags: [],
    components: [],
}

export const useBlogStore = create<BlogStore>()(
    devtools(
        persist(
            immer((set) => ({
                blog: initialState,

                setBlog: (blog) => {
                    set(state => {
                        state.blog = blog;
                    });
                },

                resetBlog: () => {
                    set(state => {
                        state.blog = initialState;
                    });
                },

                addComponent: (component) => {
                    set(state => {
                        if (state.blog.components.some(c => c.id === component.id)) {
                            console.error('Component ID must be unique!');
                            return;
                        }
                        state.blog.components.push(component);
                    });
                },

                updateComponent: (id, updates) => {
                    set(state => {
                        const index = state.blog.components.findIndex(c => c.id === id);
                        if (index === -1) {
                            console.error(`Component ${id} not found!`);
                            return;
                        }
                        Object.assign(state.blog.components[index], updates);
                    });
                },

                deleteComponent: (id) => {
                    set(state => {
                        state.blog.components = state.blog.components.filter(c => c.id !== id);
                    });
                },
            })),
            {
                name: 'blog-data',
                version: 1,
                partialize: (state) => ({
                    blog: state.blog
                }),
            }
        ),
        { name: 'BlogStore' }
    )
);
