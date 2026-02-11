import React from 'react'
import { Link } from 'react-router'

const Breadcrumb = ({ items }) => {
    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center text-sm text-gray-500 space-x-2">

                <li className="flex items-center">
                    <Link
                        className="hover:text-gray-700 transition-colors duration-200"
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                    <svg
                        className="mx-2 h-4 w-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    return (
                        <li
                            key={index}
                            className={`flex items-center ${isLast ? 'text-gray-700 font-medium' : ''}`}
                            aria-current={isLast ? 'page' : undefined}
                        >
                            {!isLast && item.link ? (
                                <Link
                                    to={item.link}
                                    className="hover:text-gray-700 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span>{item.label}</span>
                            )}

                            {!isLast && (
                                <svg
                                    className="mx-2 h-4 w-4 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumb
