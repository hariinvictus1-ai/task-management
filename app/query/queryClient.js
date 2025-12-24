// src/queryClient.js

import { QueryClient } from "@tanstack/react-query";


 const queryClientFn = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 30, // 30 sec
        },
    },
});

export default queryClientFn ;