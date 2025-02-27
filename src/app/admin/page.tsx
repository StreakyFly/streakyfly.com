export default function AdminPanel() {
    return (
        <Dashboard />
    );
}

const Dashboard = () => {
    return (
        <div className="flex flex-1 h-full">
            <div className="p-2 md:p-10 flex flex-col gap-2 flex-1">
                <div className="flex gap-2">
                    {[...new Array(4)].map((_, index) => (
                        <div
                            key={"first" + index}
                            className="h-80 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex gap-2 flex-1">
                    {[...new Array(2)].map((_, index) => (
                        <div
                            key={"second" + index}
                            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
