import { Card } from "@heroui/react";
import { useEffect, useState } from "react";

const QuoteCard = ()=>{
  const quotes = [
    ["Stronger", "Every Day"],
    ["Health Is", "My Priority"],
    ["One Step Closer to", "My Best Self"],
    ["Consistency", "Over Perfection"],
    ["Fuel Your Body,", "Free Your Mind"],
    ["Chase Progress,", "Not Perfection"],
    ["Wellness Is a Journey,", "Not a Destination"],
    ["Move", "with Purpose"],
    ["Building Strength", "Inside and Out"],
    ["Small Steps", "Big Changes"],
    ["Discipline", "Over Motivation"],
    ["Train Hard", "Live Strong"],
    ["Push Yourself", "Beyond Limits"],
    ["Sweat Today", "Shine Tomorrow"],
    ["Earned", "Not Given"],
    ["Rise Up", "Every Time You Fall"],
    ["Build Habits", "Build Strength"],
    ["Pain is Temporary", "Pride is Forever"],
    ["The Best", "Is Yet to Come"],
    ["Your Only Limit", "Is You"],
    ["Believe in", "The Power Within"],
    ["The Hustle", "Never Stops"],
    ["No Excuses", "Just Results"],
    ["Dream Big", "Lift Bigger"],
    ["Set Goals", "Crush Them"],
    ["Push Harder", "Than Yesterday"],
    ["Success is", "Earned, Not Given"],
    ["Fail Forward", "And Keep Going"],
    ["You vs.", "You"],
    ["Believe", "And Achieve"],
    ["Go Beyond Your", "Comfort Zone"],
    ["Never Settle", "For Less"],
    ["Success is", "Built on Failure"],
    ["No Pain", "No Gain"],
    ["Be Strong", "Be Unstoppable"],
    ["Mindset is", "Everything"],
    ["Be Strong", "Be Unstoppable"],
    ["If You’re Tired", "Keep Going"],
    ["Train Hard", "Stay Humble"]
  ];

  const [quote, setQuote] = useState(["", ""]);

  useEffect(() => {
    const randomMotto = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomMotto);
  }, []);

  return (
    <Card className="w-full h-[130px] border-none bg-gradient-to-tr from-purple-500 to-primary p-4 flex flex-col justify-center items-start" shadow="none">
      <div className="flex flex-col justify-center items-start text-white font-[900] gap-1">
        <p className="text-xl font-[800]">{quote[0]}</p>
        <div className="flex flex-col leading-tight">
          <p className="text-4xl">{quote[1]}</p>
        </div>
      </div>
    </Card>
  )
}

export default QuoteCard;