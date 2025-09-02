import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersPage from "./pages/Users/Users";
import FeedbacksPage from "./pages/Feedbacks/FeedbacksPage";
import WorkerHoursPage from "./pages/WorkerHours/WorkerHours";
import Uploads from "./pages/Uploads/Uploads";
import DisconnectTelegramPage from "./pages/Disconnect/DisconnectTelegramPage";
import Login from "./pages/Login/Login";
import { isAuthenticated } from "./utils/auth";

function ProtectedRoute({ element }: { element: JSX.Element }) {
  return isAuthenticated() ? (
    <AdminLayout>{element}</AdminLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/users"
          element={<ProtectedRoute element={<UsersPage />} />}
        />
        <Route
          path="/feedbacks"
          element={<ProtectedRoute element={<FeedbacksPage />} />}
        />
        <Route
          path="/worker-hours"
          element={<ProtectedRoute element={<WorkerHoursPage />} />}
        />
        <Route
          path="/uploads"
          element={<ProtectedRoute element={<Uploads />} />}
        />
        <Route
          path="/disconnect-telegram"
          element={<ProtectedRoute element={<DisconnectTelegramPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

