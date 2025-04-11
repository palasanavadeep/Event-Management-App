import { createBrowserRouter } from "react-router-dom";
import StandardLayout from "./components/Layouts/StandardLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import EditEventPage from "./pages/EditEventPage.jsx";
import CreateEventPage from "./pages/CreateEventPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Register from "./components/Register.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Protected from "./Protected.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StandardLayout />,
    children: [
      { index: true, element: <Protected> <HomePage /> </Protected> },
      { path: "events", element: <Protected><EventsPage /></Protected> },
      { path: "event/create", element: <Protected adminLevel={true}> <CreateEventPage /></Protected> },
      { path: "event/:eventId/edit", element: <Protected adminLevel><EditEventPage /></Protected> },
      { path: "event/:eventId", element: <Protected> <EventDetailPage /> </Protected> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      // { path: "register", element: <Register /> },
      { path: "create-event", element: <Protected adminLevel> <CreateEventPage /> </Protected> }, // Optional duplicate
      { path: "profile/:profileId", element: <Protected>  <Profile />  </Protected> },
      { path: "edit-profile", element: <Protected>  <EditProfile />  </Protected> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;
