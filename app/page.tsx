import ChatWindow from "@/components/chat/ChatWindow";

export default function OrientationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDEAE2] p-4">
      <div className="h-[85vh] w-full max-w-2xl">
        <ChatWindow />
      </div>
    </main>
  );
}
