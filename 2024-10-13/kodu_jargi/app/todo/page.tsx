import ServerTodoComponent from "@/components/todo/server-component";
import ClientTodoComponent from "@/components/todo/client-component";
export default async function Index(){
  return (
   <>
   <ServerTodoComponent />
   <ClientTodoComponent />
    </>
  );
}