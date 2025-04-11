import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import Layout from "@/App";
import { Home } from "@components/Home";
import { NewTask } from "@components/NewTask";
import { EditTask } from "@components/EditTask";
import "@/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="new-task" element={<NewTask />} />
          <Route path="edit-task" element={<EditTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
