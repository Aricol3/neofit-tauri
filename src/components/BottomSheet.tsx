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
              background: "#000"
            }}
          >
            <div style={{ width: 70, height: 180 }}>
              <Wheel initIdx={1} length={24} width={23} loop={false} />
            </div>
            <div style={{ width: 70, height: 180 }}>
              <Wheel
                initIdx={35}
                length={60}
                width={23}
                loop={false}
                perspective="left"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
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
