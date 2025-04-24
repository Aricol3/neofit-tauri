import { Drawer } from "vaul";
import { Button } from "@heroui/react";
import Wheel from "./Wheel.tsx";
import { useEffect } from "react";

const BottomSheet = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} shouldScaleBackground handleOnly={true}>
      <Drawer.Portal>
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <Drawer.Content
          className="bg-white rounded-t-2xl h-fit fixed bottom-0 left-0 right-0 z-[101] p-4 will-change-transform">
          <Drawer.Handle className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 mb-6" />
          <div
            style={{
              height: "240px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <Wheel label="Set" initIdx={1}  length={2} width={80} loop={false} setValue={(rel) => (rel === 0 ? "Warmup" : "Normal")} />
              <Wheel label="Reps" initIdx={1} length={51} width={62} loop={false} />
              <Wheel
                label="Kg"
                initIdx={1}
                length={401}
                width={50}
                loop={false}
              />
          </div>
          <div className="mt-2 flex justify-between">
            <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;
