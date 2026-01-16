import React from 'react'
import { useState } from 'react'

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {/* sidebar */}
            <aside className={`fixed md:static z-20 h-full w-64 bg-gray-900 text-white transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200`}>

                <div className='p-4 text-4xl font-bold border-b border-gray-700'>
                    Mini CRM
                </div>

                <nav className='p-4 space-y-2 text-sm'>
                    <p className='text-gray-300'>Dashboard</p>
                    <p className='text-gray-300'>Leads</p>
                </nav>
            </aside>

            {/* overlay (mobile) */}
            {open && (
                <div className='fixed inset-0 bg-black/40 z-10 md:hidden'
                    onClick={() => setOpen(false)} />
            )}

            {/* main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-14 bg-white shadow flex items-center px-4 md:hidden">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-gray-700 text-xl"
                    >
                        ☰
                    </button>
                    <h1 className="ml-4 font-semibold">CRM</h1>
                </header>

                {/* Page content */}
                <main className="p-4">{children}</main>
            </div>
        </div>
    )
}

export default DashboardLayout