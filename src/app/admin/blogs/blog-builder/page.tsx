import { blogService } from '@/database/services';
import BlogBuilder from './BlogBuilderClient';

export default async function BlogBuilderPage({ searchParams, }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const editSlug = (await searchParams).edit;
    const initialData = typeof editSlug === 'string'
        ? await blogService.getBlog(editSlug)
        : null;

    return <BlogBuilder initialData={initialData} />;
}



// 'use client';
//
// import { useBlogStore } from '@/stores/useBlogStore';
// import BlogComponentRenderer from '@/components/blog/BlogComponentRenderer';
// import BlogSettings from './BlogSettings';
//
// export default function BlogBuilder() {
//     const { blog, addComponent } = useBlogStore();
//
//     return (
//         <div className="flex flex-col h-screen">
//             {/* Top Bar */}
//             <header className="p-4 border-b flex items-center gap-4">
//                 <input
//                     value={blog.title}
//                     onChange={(e) => useBlogStore.setState(state => {
//                         state.blog.title = e.target.value;
//                     })}
//                     className="text-xl font-bold bg-transparent"
//                     placeholder="Untitled Post"
//                 />
//                 <div className="flex-1" />
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded">
//                     Save
//                 </button>
//             </header>
//
//             <div className="flex flex-1 overflow-hidden">
//                 {/* Left Sidebar - Component Library */}
//                 <aside className="w-64 border-r p-4">
//                     <h2 className="font-semibold mb-4">Add Components</h2>
//                     <button
//                         onClick={() => addComponent({
//                             id: crypto.randomUUID(),
//                             type: 'paragraph',
//                             text: 'New paragraph...',
//                             style: {}
//                         })}
//                         className="w-full p-2 mb-2 text-left hover:bg-gray-100 rounded"
//                     >
//                         + Paragraph
//                     </button>
//                     <button
//                         onClick={() => addComponent({
//                             id: crypto.randomUUID(),
//                             type: 'image',
//                             src: '',
//                             alt: '',
//                             style: {}
//                         })}
//                         className="w-full p-2 text-left hover:bg-gray-100 rounded"
//                     >
//                         + Image
//                     </button>
//                 </aside>
//
//                 {/* Main Editor Area */}
//                 <main className="flex-1 p-4 overflow-y-auto">
//                     <BlogComponentRenderer />
//                 </main>
//
//                 {/* Right Sidebar - Settings */}
//                 <aside className="w-64 border-l p-4">
//                     <BlogSettings />
//                 </aside>
//             </div>
//         </div>
//     );
// }