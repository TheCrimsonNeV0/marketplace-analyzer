import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";

/* =========================
   Shared Input Styling
========================= */
const INPUT_STYLE = {
    height: "2.5rem"
};

export default function GtinInputPage() {
    const [marketplace, setMarketplace] = useState("US");
    const [filterAmazon, setFilterAmazon] = useState(true);
    const [filterUsed, setFilterUsed] = useState(true);

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                padding: "1.5rem",
                paddingBottom: "2rem", // ✅ bottom padding
                boxSizing: "border-box",
                overflow: "hidden"
            }}
        >
            {/* =========================
          TITLE
      ========================= */}
            <div className="text-center mb-3">
                <h2 className="text-primary">
                    📦 AI-Powered Amazon Product Analyzer
                </h2>
            </div>

            {/* =========================
          MAIN LAYOUT
      ========================= */}
            <div
                className="grid"
                style={{
                    height: "calc(100vh - 120px)" // adjusted for bottom padding
                }}
            >
                {/* =========================
            LEFT: FORM
        ========================= */}
                <div
                    className="col-12 md:col-7"
                    style={{
                        height: "100%",
                        overflowY: "auto",
                        paddingRight: "1rem"
                    }}
                >
                    {/* Marketplace */}
                    <div className="grid align-items-center mb-4">
                        <div className="col-12 md:col-4 md:text-right font-medium">
                            Marketplace:
                        </div>
                        <div className="col-12 md:col-8 flex gap-3 flex-wrap">
                            {[
                                { label: "🇺🇸 US", value: "US" },
                                { label: "🇨🇦 CA", value: "CA" },
                                { label: "🇬🇧 UK", value: "UK" },
                                { label: "🇩🇪 DE", value: "DE" },
                                { label: "🇲🇽 MX", value: "MX" }
                            ].map((m) => (
                                <div key={m.value} className="flex align-items-center gap-1">
                                    <RadioButton
                                        value={m.value}
                                        checked={marketplace === m.value}
                                        onChange={(e) => setMarketplace(e.value)}
                                    />
                                    <label>{m.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid align-items-start mb-4">
                        <div className="col-12 md:col-4 md:text-right font-medium">
                            Filters:
                        </div>
                        <div className="col-12 md:col-8">
                            <div className="flex align-items-center gap-2 mb-2">
                                <Checkbox checked={filterAmazon} onChange={(e) => setFilterAmazon(e.checked)} />
                                <label>Filter Amazon Selling</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <Checkbox checked={filterUsed} onChange={(e) => setFilterUsed(e.checked)} />
                                <label>Filter Used Sellers</label>
                            </div>
                        </div>
                    </div>

                    {/* Inputs */}
                    {[
                        ["GTIN / ASIN:", <InputText style={{ ...INPUT_STYLE, width: "200px" }} />],
                        ["Unit Cost ($):", <InputNumber mode="currency" currency="USD" inputStyle={INPUT_STYLE} />],
                        ["Seller Count ≥", <InputNumber value={3} inputStyle={INPUT_STYLE} />],
                        ["Profit Percentage ≥", <InputNumber suffix=" %" value={20} inputStyle={INPUT_STYLE} />],
                        ["Weight Limit (g):", <InputNumber inputStyle={INPUT_STYLE} />],
                        ["BuyBox Win Threshold:", <InputNumber suffix=" %" value={80} inputStyle={INPUT_STYLE} />],
                        ["Preparing Cost ($):", <InputNumber mode="currency" currency="USD" value={0} inputStyle={INPUT_STYLE} />]
                    ].map(([label, input], i) => (
                        <div key={i} className="grid align-items-center mb-3">
                            <div className="col-12 md:col-4 md:text-right font-medium">{label}</div>
                            <div className="col-12 md:col-8">{input}</div>
                        </div>
                    ))}
                </div>

                {/* =========================
            RIGHT: BUTTONS ABOVE LOG
        ========================= */}
                <div
                    className="col-12 md:col-5"
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem" // consistent vertical spacing
                    }}
                >
                    {/* Log Output */}
                    <div style={{ flexGrow: 1, minHeight: 0 }}>
                        <Card
                            title="🔍 Log Output"
                            className="log-card"
                            style={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    padding: "0.75rem"
                                }}
                            >
                                <InputTextarea
                                    style={{
                                        flex: 1,
                                        width: "100%",
                                        height: "400%",
                                        fontFamily: "Consolas, monospace",
                                        resize: "none"
                                    }}
                                    value={"App ready.\n"}
                                    readOnly
                                />
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-content-center gap-3">
                        <Button
                            label="Fetch Product Details"
                            className="p-button-outlined p-button-success"
                            style={{ width: "220px" }}
                        />
                        <Button
                            label="📁 Upload GTIN CSV"
                            className="p-button-outlined p-button-info"
                            style={{ width: "220px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
