import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Calendar } from "lucide-react";

interface CalSchedulerProps {
  buttonText?: string;
  buttonClassName?: string;
  namespace?: string;
  calLink?: string;
  layout?: string;
  onClick?: () => void;
}

export default function CalScheduler({
  buttonText = "Schedule Meeting",
  buttonClassName = "",
  namespace = "30min",
  calLink = "karel-duchon-arkadialabs/30min",
  layout = "month_view",
  onClick,
}: CalSchedulerProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        hideEventTypeDetails: false,
        layout
      });
    })();
  }, [namespace, layout]);

  return (
    <button
      data-cal-namespace={namespace}
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({ layout })}
      className={buttonClassName}
      onClick={onClick}
    >
      <Calendar className="h-6 w-6" />
      {buttonText}
    </button>
  );
}
