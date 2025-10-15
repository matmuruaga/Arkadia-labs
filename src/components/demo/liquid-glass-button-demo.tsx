import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";

export default function LiquidGlassButtonDemo() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-8">
      {/* Liquid Button Demo */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Liquid Glass Button
        </h2>
        <div className="relative h-[200px] w-[800px] max-w-full flex items-center justify-center">
          <LiquidButton className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            Liquid Glass Effect
          </LiquidButton>
        </div>
      </div>

      {/* Metal Buttons Demo */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Metal Buttons (Bonus)
        </h2>
        <div className="flex flex-wrap gap-4 justify-center max-w-4xl">
          <MetalButton variant="default">Default</MetalButton>
          <MetalButton variant="primary">Primary</MetalButton>
          <MetalButton variant="success">Success</MetalButton>
          <MetalButton variant="error">Error</MetalButton>
          <MetalButton variant="gold">Gold</MetalButton>
          <MetalButton variant="bronze">Bronze</MetalButton>
        </div>
      </div>

      {/* Liquid Button Variants */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Liquid Button Sizes
        </h2>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <LiquidButton size="sm">Small</LiquidButton>
          <LiquidButton size="default">Default</LiquidButton>
          <LiquidButton size="lg">Large</LiquidButton>
          <LiquidButton size="xl">Extra Large</LiquidButton>
          <LiquidButton size="xxl">XX Large</LiquidButton>
        </div>
      </div>
    </div>
  );
}
