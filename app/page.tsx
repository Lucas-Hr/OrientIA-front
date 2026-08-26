import ChatWindow from "@/components/chat/ChatWindow";

export default function OrientationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDEAE2] p-4">
      <div className="h-[90vh] w-full max-w-5xl">
        <ChatWindow />
      </div>
    </main>
  );
}
