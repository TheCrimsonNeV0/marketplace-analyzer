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
    /* =========================
       STATE
    ========================= */
    const [apiKey, setApiKey] = useState("");
    const [gtin, setGtin] = useState("");

    const [marketplace, setMarketplace] = useState("US");

    const [unitCost, setUnitCost] = useState(null);
    const [unitPerCase, setUnitPerCase] = useState(1);
    const [prepCost, setPrepCost] = useState(0);

    const [sellerCountMin, setSellerCountMin] = useState(1);
    const [profitPctMin, setProfitPctMin] = useState(1);
    const [weightLimit, setWeightLimit] = useState(null);
    const [buyboxWinThreshold, setBuyboxWinThreshold] = useState(99);

    const [filterAmazon, setFilterAmazon] = useState(true);
    const [filterUsed, setFilterUsed] = useState(true);

    const [loading, setLoading] = useState(false);
    const [logText, setLogText] = useState("App ready.\n");
    const [response, setResponse] = useState(null);

    /* =========================
       LOG FILTER
    ========================= */
    const extractProcessingLog = (log) => {
        if (!log) return "";

        const marker = "⚙️ Processing product data...";
        const idx = log.indexOf(marker);

        if (idx === -1) return log;
        return log.substring(idx + marker.length).trim();
    };

    /* =========================
       FETCH HANDLER
    ========================= */
    const handleAnalyze = async () => {
        const payload = {
            apiKey,
            gtin,
            marketplace,

            unitCost: Number(unitCost),
            unitPerCase: Number(unitPerCase),
            prepCost: Number(prepCost),

            sellerCountMin: Number(sellerCountMin),
            profitPctMin: Number(profitPctMin),
            weightLimit: weightLimit !== null ? Number(weightLimit) : null,
            buyboxWinThreshold: Number(buyboxWinThreshold),

            filterAmazonSelling: filterAmazon,
            filterUsedSellers: filterUsed
        };

        try {
            setLoading(true);
            setLogText("⏳ Analyzing product...\n");

            const res = await fetch("http://127.0.0.1:5000/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            setResponse(data);
            setLogText(extractProcessingLog(data.log));
        } catch (err) {
            console.error(err);
            setLogText("❌ Failed to analyze product.");
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       RENDER
    ========================= */
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                padding: "1.5rem",
                boxSizing: "border-box"
            }}
        >
            {/* TITLE */}
            <div className="text-center mb-3">
                <h2 className="text-primary">
                    📦 AI-Powered Amazon Product Analyzer
                </h2>
            </div>

            <div className="grid" style={{ height: "calc(100vh - 120px)" }}>
                {/* ================= LEFT: FORM ================= */}
                <div
                    className="col-12 md:col-7"
                    style={{ overflowY: "auto", paddingRight: "1rem" }}
                >
                    {/* API KEY */}
                    {/*<div className="grid align-items-center mb-3">*/}
                    {/*    <div className="col-12 md:col-4 md:text-right font-medium">*/}
                    {/*        API Key:*/}
                    {/*    </div>*/}
                    {/*    <div className="col-12 md:col-8">*/}
                    {/*        <InputText*/}
                    {/*            value={apiKey}*/}
                    {/*            onChange={(e) => setApiKey(e.target.value)}*/}
                    {/*            style={{ ...INPUT_STYLE, width: "320px" }}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* MARKETPLACE */}
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

                    {/* FILTERS */}
                    <div className="grid align-items-start mb-4">
                        <div className="col-12 md:col-4 md:text-right font-medium">
                            Filters:
                        </div>
                        <div className="col-12 md:col-8">
                            <div className="flex align-items-center gap-2 mb-2">
                                <Checkbox
                                    checked={filterAmazon}
                                    onChange={(e) => setFilterAmazon(e.checked)}
                                />
                                <label>Filter Amazon Selling</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <Checkbox
                                    checked={filterUsed}
                                    onChange={(e) => setFilterUsed(e.checked)}
                                />
                                <label>Filter Used Sellers</label>
                            </div>
                        </div>
                    </div>

                    {/* INPUT FIELDS */}
                    {[
                        ["GTIN / ASIN:", (
                            <InputText
                                value={gtin}
                                onChange={(e) => setGtin(e.target.value)}
                                style={{ ...INPUT_STYLE, width: "200px" }}
                            />
                        )],
                        ["Unit Cost ($):", (
                            <InputNumber
                                mode="currency"
                                currency="USD"
                                value={unitCost}
                                onValueChange={(e) => setUnitCost(e.value)}
                                inputStyle={INPUT_STYLE}
                            />
                        )],
                        ["Seller Count ≥", (
                            <InputNumber
                                value={sellerCountMin}
                                onValueChange={(e) => setSellerCountMin(e.value)}
                                inputStyle={INPUT_STYLE}
                            />
                        )],
                        ["Profit Percentage ≥", (
                            <InputNumber
                                suffix=" %"
                                value={profitPctMin}
                                onValueChange={(e) => setProfitPctMin(e.value)}
                                inputStyle={INPUT_STYLE}
                            />
                        )],
                        ["Weight Limit (g):", (
                            <InputNumber
                                value={weightLimit}
                                onValueChange={(e) => setWeightLimit(e.value)}
                                inputStyle={INPUT_STYLE}
                            />
                        )],
                        ["BuyBox Win Threshold:", (
                            <InputNumber
                                suffix=" %"
                                value={buyboxWinThreshold}
                                onValueChange={(e) => setBuyboxWinThreshold(e.value)}
                                inputStyle={INPUT_STYLE}
                            />
                        )],
                        ["Preparing Cost ($):", (
                            <InputNumber
                                mode="currency"
                                currency="USD"
                                value={prepCost}
                                onValueChange={(e) => setPrepCost(e.value)}
                                inputStyle={INPUT_STYLE}
                            />
                        )]
                    ].map(([label, input], i) => (
                        <div key={i} className="grid align-items-center mb-3">
                            <div className="col-12 md:col-4 md:text-right font-medium">
                                {label}
                            </div>
                            <div className="col-12 md:col-8">{input}</div>
                        </div>
                    ))}
                </div>

                {/* ================= RIGHT: LOG + BUTTON ================= */}
                <div
                    className="col-12 md:col-5"
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem"
                    }}
                >
                    <Card
                        title="🔍 Log Output"
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0
                        }}
                    >
                        <InputTextarea
                            value={logText}
                            readOnly
                            style={{
                                flexGrow: 1,
                                width: "100%",
                                height: "50vh",
                                minHeight: 0,
                                fontFamily: "Consolas, monospace",
                                resize: "none"
                            }}
                        />
                        {response && (
                            <div className="text-center mt-2">
                                <strong>
                                    {response.passed ? "✅ PASSED" : "❌ FAILED"}
                                </strong>
                            </div>
                        )}
                    </Card>

                    <div className="flex justify-content-center gap-3">
                        <Button
                            label="Fetch Product Details"
                            className="p-button-outlined p-button-success"
                            style={{ width: "220px" }}
                            loading={loading}
                            onClick={handleAnalyze}
                        />
                        <Button
                            label="📁 Upload GTIN CSV"
                            className="p-button-outlined p-button-info"
                            style={{ width: "220px" }}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
