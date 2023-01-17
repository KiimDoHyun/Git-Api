import "./App.css";
import SetRepoList from "./Setting/SetRepoList";
import Router from "./Router/Router";
import SideBarComponent from "./Component/SideBarComponent";
import { DragDropContext } from "react-beautiful-dnd";
import { useCallback } from "react";
function App() {
    const onDragStart = useCallback(() => {}, []);
    const onDragEnd = useCallback(() => {}, []);
    return (
        <div className="App">
            {/* Setting */}
            <SetRepoList />

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                {/* Side */}
                <SideBarComponent />

                {/* Main */}
                <Router />
            </DragDropContext>
        </div>
    );
}

export default App;
