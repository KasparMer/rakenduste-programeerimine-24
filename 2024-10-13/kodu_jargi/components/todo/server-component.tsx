"use server";

import { createClient } from "@/utils/supabase/server";
import { Button } from "shadcn/ui"; 
import { useState } from "react";

export default async function ServerTodoComponent() {
    const supabase = createClient();

    const addTodo = async (title: string, priority: number) => {
        const { data, error } = await supabase
            .from('todo')
            .insert([{ title, priority }])
            .select();

        if (error) {
            console.error('TODO lisamise viga:', error);
        }

        return data;
    };

    const fetchTodos = async () => {
        const { data: todos, error } = await supabase
            .from('todo')
            .select('*');

        if (error) {
            console.error('TODO-de laadimise viga:', error);
        }

        return todos;
    };

    const updateTodo = async (id: number, newTitle: string) => {
        const { data, error } = await supabase
            .from('todo')
            .update({ title: newTitle })
            .eq('id', id)
            .select();

        if (error) {
            console.error('TODO uuendamise viga:', error);
        }

        return data;
    };

    const deleteTodo = async (id: number) => {
        const { error } = await supabase
            .from('todo')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('TODO kustutamise viga:', error);
        }
    };

    const todos = await fetchTodos();

    return (
        <>
            <main className="flex-1 flex flex-col gap-6 px-4 py-8 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">TODO nimekiri</h1>
                <ul className="bg-white shadow-md rounded-lg p-4">
                    {todos && todos.length > 0 ? (
                        todos.map(todo => (
                            <li key={todo.id} className="flex justify-between items-center p-2 border-b">
                                <span className="text-lg">{todo.title} - {todo.priority}</span>
                                <div>
                                    <Button onClick={() => deleteTodo(todo.id)} className="mr-2">Kustuta</Button>
                                    <Button onClick={() => updateTodo(todo.id, 'Uus pealkiri')}>Uuenda</Button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">TODO-sid ei leitud.</p>
                    )}
                </ul>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Lisa TODO</h2>
                    <input
                        type="text"
                        placeholder="TODO pealkiri"
                        className="border rounded-md p-2 mr-2 w-1/3"
                    />
                    <input
                        type="number"
                        placeholder="Prioriteet"
                        className="border rounded-md p-2 mr-2 w-1/3"
                    />
                    <Button onClick={() => addTodo("Uus TODO", 1)}>Lisa TODO</Button>
                </div>
            </main>
        </>
    );
}