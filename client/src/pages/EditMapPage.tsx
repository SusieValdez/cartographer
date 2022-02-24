import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { drawLine } from "../draw";
import useCanvas from "../hooks/useCanvas";
import useSyncCanvas from "../hooks/useSyncCanvas";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const WIDTH = 3000;
const HEIGHT = 1500;

function EditMapPage() {
  const { id: idStr } = useParams();
  const navigate = useNavigate();

  if (!idStr) {
    throw Error("EditMapPage requires an id in the url params");
  }
  const id = parseInt(idStr);
  useEffect(() => {
    if (Number.isNaN(id)) {
      navigate("/", { replace: true });
    }
  }, [id, navigate]);

  const { ctx, ref } = useCanvas(WIDTH, HEIGHT);
  useSyncCanvas(ctx, id, 5000);

  const [penDown, setPenDown] = useState(false);
  const [[x, y], setPenPosition] = useState([0, 0]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setPenDown(true);
    setPenPosition([e.clientX, e.clientY]);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!penDown || !ctx) {
      return;
    }
    const [newX, newY] = [e.clientX, e.clientY];
    drawLine(ctx, x, y, newX, newY, "black", 1);
    setPenPosition([newX, newY]);
  };

  const onMouseUp = () => {
    setPenDown(false);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-green">Name of Map</div>
      <div className="flex flex-row flex-1">
        <div className="bg-light-red w-20">100</div>
        <div className="flex flex-1 h-full">
          <TransformWrapper>
            <TransformComponent
              wrapperStyle={{
                height: "100%",
                background: "brown",
                alignItems: "center",
              }}
            >
              <canvas
                ref={ref}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                className="w-full bg-[white]"
              ></canvas>
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="bg-red w-60">sf</div>
      </div>
    </div>
  );
}

export default EditMapPage;
