import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersPage from "./pages/Users/Users";
import FeedbacksPage from "./pages/Feedbacks/FeedbacksPage";
import WorkerHoursPage from "./pages/WorkerHours/WorkerHours";
import Uploads from "./pages/Uploads/Uploads";
import DisconnectTelegramPage from "./pages/Disconnect/DisconnectTelegramPage";

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/feedbacks" element={<FeedbacksPage />} />
          <Route path="/worker-hours" element={<WorkerHoursPage />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route
            path="/disconnect-telegram"
            element={<DisconnectTelegramPage />}
          />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
