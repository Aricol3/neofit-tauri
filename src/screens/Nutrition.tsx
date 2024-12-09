import { Card, CardBody, CardHeader, Divider, Progress } from "@nextui-org/react";
import FoodCard from "../components/FoodCard.tsx";
import MacroProgress from "../components/MacroProgress.tsx";
import { MACRO, MEAL } from "../types.ts";
import MealSection from "../components/MealSection.tsx";
import { SwipeActions } from "../components/SwipeActions.tsx";

const Nutrition = () => {
  const proteinValue = 104;
  const targetProteinValue = 165;

  const carbohydratesValue = 204;
  const targetCarbohydratesValue = 412;

  const fatValue = 79;
  const targetFatValue = 110;

  return (
    <div className="p-3">
      <h1 className="text-xl">Calories Remaining</h1>

      <p>3.300 - 0 = 3.300 remaining</p>
      <MacroProgress label={MACRO.PROTEIN} value={proteinValue} targetValue={targetProteinValue}/>
      <MacroProgress label={MACRO.CARBS} value={carbohydratesValue} targetValue={targetCarbohydratesValue}/>
      <MacroProgress label={MACRO.FAT} value={fatValue} targetValue={targetFatValue}/>
      <Divider />
      {/*<MealSection meal={MEAL.BREAKFAST}/>*/}
      {/*<MealSection meal={MEAL.LUNCH}/>*/}
      {/*<MealSection meal={MEAL.DINNER}/>*/}
      <Card className="mt-4" style={{backgroundColor:"#faf9f6"}}>
        <CardHeader className="flex flex-col items-start">
          <div className="text-xl">Breakfast</div>
          <Divider/>
        </CardHeader>
        <CardBody>
          <div className="flex flex-row items-center justify-between gap-1 mb-1 h-12">
            <div className="text-sm">
              <p className="font-normal">Chicken Strips American Style With Curry</p>
              <p className="font-light">Culinea, 500 gram</p>
            </div>
            <div className="text-sm">
              900
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-1 mb-2 h-12">
            <div className="text-sm">
              <p className="font-normal">Chicken Strips American Style With Curry</p>
              <p className="font-light">Culinea, 500 gram</p>
            </div>
            <div className="text-sm">
              900
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-1 mb-2 h-12">
            <div className="text-sm">
              <p className="font-normal">Chicken Strips American Style With Curry</p>
              <p className="font-light">Culinea, 500 gram</p>
            </div>
            <div className="text-sm">
              900
            </div>
          </div>
        </CardBody>
      </Card>
      <MealSection meal={MEAL.LUNCH}/>
      <SwipeActions.Root className='chat-demo'>
        <SwipeActions.Trigger className='demo-trigger'>

          <div className="info">
            <div className="title">
              <div className="name">Alice</div>
              <div className="time">16:25</div>
            </div>
            <div className="message">
              About your car extended warranty
            </div>

          </div>
        </SwipeActions.Trigger>
        <SwipeActions.Actions wrapperClassName='demo-actions-wrapper'>
          <SwipeActions.Action
            className='demo-action'
            style={{ ['--color' as any]: '#ffe8e8' }}
          >
            {/*<HiTrash />*/}
            <div>Delete</div>
          </SwipeActions.Action>
          <SwipeActions.Action
            className='demo-action'
            style={{ ['--color' as any]: '#e8fff3' }}
          >
            {/*<HiStar />*/}
            <div>Bookmark</div>
          </SwipeActions.Action>
          <SwipeActions.Action
            className='demo-action'
            style={{ ['--color' as any]: '#e6f0ff' }}
          >
            {/*<HiEnvelopeOpen />*/}
            <div>Read</div>
          </SwipeActions.Action>
        </SwipeActions.Actions>
      </SwipeActions.Root>
    </div>
  );
};

export default Nutrition;
