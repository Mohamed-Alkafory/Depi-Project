import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "sonner";

import { queryClient } from "./lib/queryClient";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
