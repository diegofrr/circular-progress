import { cva, type VariantProps } from "class-variance-authority";

const circularProgressVariants = cva(
  "transition-all duration-500 ease-in-out",
  {
    variants: {
      variant: {
        primary: "text-primary",
        warning: "text-yellow-500 dark:text-yellow-400",
        success: "text-green-500 dark:text-green-400",
        danger: "text-red-500 dark:text-red-400",
      },
      size: {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface CircularProgressProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof circularProgressVariants> {
  progress: number;
  strokeWidth?: number;
}

export const CircularProgress = ({
  progress = 0,
  strokeWidth,
  variant,
  size,
  className,
  ...props
}: CircularProgressProps) => {
  const sizeValue = size === "sm" ? 64 : size === "md" ? 96 : 128;
  const defaultStrokeWidth = size === "sm" ? 8 : size === "md" ? 12 : 16;
  const actualStrokeWidth = strokeWidth || defaultStrokeWidth;

  const viewBox = `0 0 ${sizeValue} ${sizeValue}`;
  const radius = (sizeValue - actualStrokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  const fontSize =
    size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg";

  return (
    <svg
      viewBox={viewBox}
      className={circularProgressVariants({ variant, size, className })}
      {...props}
    >
      <circle
        fill="none"
        stroke="currentColor"
        cx={sizeValue / 2}
        cy={sizeValue / 2}
        r={radius}
        strokeWidth={actualStrokeWidth}
        className={`${circularProgressVariants({
          variant,
          size,
          className,
        })} opacity-20`}
      />
      <circle
        fill="none"
        stroke="currentColor"
        cx={sizeValue / 2}
        cy={sizeValue / 2}
        r={radius}
        strokeWidth={actualStrokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - dash}
        className={circularProgressVariants({ variant })}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: "rotate(-90deg)",
        }}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className={`fill-current font-bold ${fontSize} ${circularProgressVariants(
          { variant }
        )}`}
      >
        {`${Math.round(progress)}%`}
      </text>
    </svg>
  );
};
