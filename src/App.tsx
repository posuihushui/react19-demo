import { BrowserRouter, Routes, Route } from "react-router";
import Demo1 from "./pages/page1";
import Demo2 from "./pages/page2";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Demo1 />} />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/demo2" element={<Demo2 />} />
      </Routes>
    </BrowserRouter>
  );
}
