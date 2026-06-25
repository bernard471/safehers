// Shared disclaimer for all financial literacy pages
export const FINANCIAL_DISCLAIMER =
  "The content on this page is provided for educational purposes only. It does not constitute personalised financial advice and should not be relied upon as such. SafeHer Foundation is not a licensed financial advisor. Before making any financial decision, please consult a qualified financial professional licensed in your jurisdiction.";

export function FinancialDisclaimer() {
  return (
    <div className="border border-ink/20 bg-bone p-6 my-8">
      <p className="font-mono text-xs tracking-widest uppercase opacity-50 mb-2">
        Educational disclaimer
      </p>
      <p className="text-sm text-ink/70 leading-relaxed">{FINANCIAL_DISCLAIMER}</p>
    </div>
  );
}
