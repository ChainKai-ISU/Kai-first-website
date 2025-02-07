'use client';
import { useState, useEffect } from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newDetails, setNewDetails] = useState('');
    const [priority, setPriority] = useState('normal');
    const [expandedId, setExpandedId] = useState(null);

    // 從 localStorage 讀取待辦事項
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // 儲存待辦事項到 localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const priorityOptions = {
        normal: { label: '普通', color: 'bg-green-100 text-green-800' },
        important: { label: '重要', color: 'bg-yellow-100 text-yellow-800' },
        urgent: { label: '緊急', color: 'bg-red-100 text-red-800' }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        setTodos([
            ...todos,
            {
                id: Date.now(),
                title: newTodo,
                details: newDetails,
                completed: false,
                priority: priority,
                createdAt: Date.now()
            }
        ]);
        setNewTodo('');
        setNewDetails('');
        setPriority('normal');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`確定要刪除待辦事項「${title}」嗎？`)) {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-green-800 text-center mb-6">待辦事項</h1>
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    {/* 新增待辦事項表單 */}
                    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="輸入待辦事項..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="normal">普通</option>
                                <option value="important">重要</option>
                                <option value="urgent">緊急</option>
                            </select>
                        </div>
                        <div>
                            <textarea
                                value={newDetails}
                                onChange={(e) => setNewDetails(e.target.value)}
                                placeholder="輸入詳細資訊..."
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faPencil} className="w-4 h-4" />
                                產生待辦事項
                            </button>
                        </div>
                    </form>

                    {/* 待辦事項列表 */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-green-800 mb-4">待辦事項列表</h2>
                        {todos.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">目前沒有待辦事項</p>
                        ) : (
                            <div className="space-y-2">
                                {todos.map(todo => (
                                    <div
                                        key={todo.id}
                                        className="bg-gray-50 rounded-lg overflow-hidden"
                                    >
                                        <div className="flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors duration-200">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleTodo(todo.id)}
                                                className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                            />
                                            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                {todo.title}
                                            </span>
                                            <button
                                                onClick={() => toggleExpand(todo.id)}
                                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 inline-flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon 
                                                    icon={expandedId === todo.id ? faChevronUp : faChevronDown} 
                                                    className="w-3 h-3" 
                                                />
                                                {expandedId === todo.id ? '收起' : '展開'}
                                            </button>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityOptions[todo.priority].color}`}>
                                                {priorityOptions[todo.priority].label}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(todo.id, todo.title)}
                                                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 inline-flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" />
                                                刪除
                                            </button>
                                        </div>
                                        {expandedId === todo.id && (
                                            <div className="px-4 pb-4">
                                                <div className="bg-white p-3 rounded-lg">
                                                    <p className="text-gray-700 whitespace-pre-wrap">
                                                        {todo.details || '無詳細資訊'}
                                                    </p>
                                                </div>
                                                <div className="text-right mt-2">
                                                    <span className="text-sm text-gray-400">
                                                        {formatDate(todo.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 