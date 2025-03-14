import { BrowserRouter, Routes, Route } from "react-router";
import Demo1 from "./pages/page1";
import Demo2 from "./pages/page2";
import Demo3 from "./pages/page3";
import Demo4 from "./pages/page4";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Demo1 />} />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/demo2" element={<Demo2 />} />
        <Route path="/demo3" element={<Demo3 />} />
        <Route path="/demo4" element={<Demo4 />} />
      </Routes>
    </BrowserRouter>
  );
}
