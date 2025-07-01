import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store.ts";
import { setUserProfile } from "../api/userApi.ts";
import { setProfile } from "../slices/userProfileSlice.ts";

const GenderSelector = ({ onSelect }: { onSelect: (value: string) => void }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div>
          <Input
            className="select-none pointer-events-none"
            size="lg"
            label="Gender"
            value={selectedValue}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(key) => {
          const value = key.currentKey as string;
          setSelectedKeys(new Set([value]));
          onSelect(value);
        }}
      >
        <DropdownItem key="male" color="primary">
          <p className="text-lg">male</p>
        </DropdownItem>
        <DropdownItem key="female" color="primary">
          <p className="text-lg">female</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const ActivityLevelSelector = ({ onSelect }: { onSelect: (value: string) => void }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div>
          <Input
            className="select-none pointer-events-none"
            size="lg"
            label="Activity Level"
            value={selectedValue}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(key) => {
          const value = key.currentKey as string;
          setSelectedKeys(new Set([value]));
          onSelect(value);
        }}
      >
        <DropdownItem key="sedentary" color="primary"><p className="text-lg">sedentary</p></DropdownItem>
        <DropdownItem key="light" color="primary"><p className="text-lg">light</p></DropdownItem>
        <DropdownItem key="moderate" color="primary"><p className="text-lg">moderate</p></DropdownItem>
        <DropdownItem key="active" color="primary"><p className="text-lg">active</p></DropdownItem>
        <DropdownItem key="very-active" color="primary"><p className="text-lg">very active</p></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const GoalSelector = ({ onSelect }: { onSelect: (value: string) => void }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div>
          <Input
            className="select-none pointer-events-none"
            size="lg"
            label="Goal"
            value={selectedValue}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(key) => {
          const value = key.currentKey as string;
          setSelectedKeys(new Set([value]));
          onSelect(value);
        }}
      >
        <DropdownItem key="lose" color="primary"><p className="text-lg">Lose Weight</p></DropdownItem>
        <DropdownItem key="maintain" color="primary"><p className="text-lg">Maintain</p></DropdownItem>
        <DropdownItem key="gain" color="primary"><p className="text-lg">Muscle Gain</p></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const SetUserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const accessToken = useSelector((state: IRootState) => state.auth.accessToken);

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");

  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);
  useEffect(() => {
    const allFilled =
      gender &&
      age.trim() &&
      height.trim() &&
      weight.trim() &&
      activityLevel &&
      goal;

    setIsConfirmDisabled(!allFilled);
  }, [gender, age, height, weight, activityLevel, goal]);

  const handleSubmit = async () => {

    try {
      const userProfile = await setUserProfile({
        gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        activityLevel,
        goal
      },accessToken!);

      dispatch(setProfile(userProfile.profile));

      navigate("/");
    } catch (err: any) {
      console.error(err.message);
      alert("Something went wrong while saving your profile.");
    }
  };

  return (
    <div className="flex flex-col p-3 pt-1.5 gap-3 justify-center">
      <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
        <CardHeader className="text-textPrimaryColor text-xl font-[600]">
          Set User Profile
        </CardHeader>
        <CardBody className="gap-5">
          <GenderSelector onSelect={setGender} />
          <Input
            inputMode="numeric"
            size="lg"
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            inputMode="numeric"
            size="lg"
            label="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <Input
            inputMode="numeric"
            size="lg"
            label="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <ActivityLevelSelector onSelect={setActivityLevel} />
          <GoalSelector onSelect={setGoal} />
          <Button
            isDisabled={isConfirmDisabled}
            color="primary"
            className="text-lg font-bold text-white"
            onPress={handleSubmit}
          >
            Confirm
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default SetUserProfile;
