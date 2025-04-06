import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./components/notificationContext";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>{children}</NotificationProvider>
    </QueryClientProvider>
  );
}
