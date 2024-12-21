"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function ClientTodoComponent() {
    const [todos, setTodos] = useState<any[]>([]); 
    const [newTitle, setNewTitle] = useState('');
    const [newPriority, setNewPriority] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [updateValue, setUpdateValue] = useState('');
    const supabase = createClient();

    
    useEffect(() => {
        const getTodo = async () => {
            let { data, error } = await supabase.from('todo').select('*');
            if (error) {
                console.error('TODO-de laadimise viga:', error);
            } else {
                setTodos(data || []); 
            }
        };
        getTodo();
    }, []);

    
    const addTodo = async () => {
        const { data, error } = await supabase
            .from('todo')
            .insert([{ title: newTitle, priority: newPriority }])
            .select();

        if (error) {
            console.error('TODO lisamise viga:', error);
        } else {
            setTodos([...todos, ...data]);
            setNewTitle('');
            setNewPriority('');
        }
    };

 
    const updateTodo = async () => {
        const { data, error } = await supabase
            .from('todo')
            .update({ title: updateValue }) 
            .eq('id', updateId); 

        if (error) {
            console.error('TODO uuendamise viga:', error);
        } else {
            setTodos(todos.map(todo => (todo.id === updateId ? { ...todo, title: updateValue } : todo)));
            setUpdateId('');
            setUpdateValue('');
        }
    };

    
    const deleteTodo = async (id: string) => {
        const { error } = await supabase
            .from('todo')
            .delete()
            .eq('id', id); 

        if (error) {
            console.error('TODO kustutamise viga:', error);
        } else {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };

    return (
        <>
            <main className="flex-1 flex flex-col gap-6 px-4">
                <h1>TODO nimekiri</h1>
                <div>
                    <h2>Lisa TODO</h2>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="TODO pealkiri"
                        required
                    />
                    <input
                        type="text"
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        placeholder="Prioriteet"
                        required
                    />
                    <button onClick={addTodo}>Lisa TODO</button>
                </div>

                <div>
                    <h2>Uuenda TODO</h2>
                    <input
                        type="text"
                        value={updateId}
                        onChange={(e) => setUpdateId(e.target.value)}
                        placeholder="TODO ID"
                        required
                    />
                    <input
                        type="text"
                        value={updateValue}
                        onChange={(e) => setUpdateValue(e.target.value)}
                        placeholder="Uus pealkiri"
                        required
                    />
                    <button onClick={updateTodo}>Uuenda TODO</button>
                </div>

                <ul>
                    {todos.length > 0 ? (
                        todos.map(todo => (
                            <li key={todo.id}>
                                {todo.title} - {todo.priority}
                                <button onClick={() => deleteTodo(todo.id)}>Kustuta</button>
                            </li>
                        ))
                    ) : (
                        <p>TODO-sid ei leitud.</p>
                    )}
                </ul>
            </main>
        </>
    );
}