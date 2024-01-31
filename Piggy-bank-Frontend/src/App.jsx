import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
function App() {
  return (
    <>
      <main className="flex justify-center items-center h-[100vh]">
        <span>
          <Header />
          <Section />
        </span>
      </main>
    </>
  );
}

export default App;
