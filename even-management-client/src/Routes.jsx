import { createBrowserRouter } from "react-router-dom";
import StandardLayout from "./components/Layouts/StandardLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import EditEventPage from "./pages/EditEventPage.jsx";
import CreateEventPage from "./pages/CreateEventPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
// import About from "./pages/About.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <StandardLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "events", element: <EventsPage /> },
            { path: "event/create", element: <CreateEventPage /> },
            { path: "event/:eventId/edit", element: <EditEventPage /> },
            { path: "event/:eventId", element: <EventDetailPage /> },
            // { path: "about", element: <About /> },
        ],
    },
]);

export default router;
