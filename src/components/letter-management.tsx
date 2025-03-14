"use client";

import type React from "react";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import {
  Search,
  ExpandIcon as Add,
  RefreshCwIcon as Refresh,
  FlipVerticalIcon as MoreVert,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for the table
const letters = [
  {
    id: 1,
    date: "17/12/2024",
    referenceNo: "OKC/GM/1152",
    project: "Agri-Product Market Center (Ayat Site)",
    subject:
      "resubmission of plot 2 wholesale roof slab, administration and retail building structural design drawing",
    from: "OVID-CONSTRUCTION",
    hasDocument: true,
    hasRemark: true,
  },
  {
    id: 2,
    date: "27/11/2024",
    referenceNo: "OVID/CCED/317/2024",
    project: "-",
    subject: "Work order for AR, ST,MEP, design and BOQ",
    from: "OVID-CONSTRUCTION",
    hasDocument: true,
    hasRemark: true,
  },
  {
    id: 3,
    date: "26/11/2024",
    referenceNo: "OVID/RE/266/24",
    project: "-",
    subject: "Request for unit rates and cost breakdown for Additional works",
    from: "OVID-REAL ESTATE",
    hasDocument: true,
    hasRemark: true,
  },
  {
    id: 4,
    date: "26/11/2024",
    referenceNo: "OTH/LT/214/24",
    project: "-",
    subject: "Assignment of metasebeya senteyehu as material engineer",
    from: "OVID-TRADE HOUSE",
    hasDocument: true,
    hasRemark: true,
  },
];

export default function LettersManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#8CC63F",
              height: 3,
            },
          }}
        >
          <Tab
            label="Incoming"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              color: tabValue === 0 ? "#8CC63F" : "inherit",
              "&.Mui-selected": {
                color: "#8CC63F",
              },
            }}
          />
          <Tab
            label="Outgoing"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                color: "#8CC63F",
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Search Section */}
      <div className="mb-6">
        <h3 className="text-gray-700 font-medium mb-2">Search Letters</h3>
        <div className="flex items-center gap-2">
          <TextField
            placeholder="search... reference no, from,subject"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Search size={20} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: "4px",
                fontSize: "14px",
              },
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="flex gap-2">
          <Button
            variant="contained"
            startIcon={<Add size={18} />}
            sx={{
              backgroundColor: "#8CC63F",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#7AB62F",
              },
              borderRadius: "4px",
              boxShadow: "none",
            }}
          >
            New Letter
          </Button>
          <IconButton
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            <Refresh size={18} />
          </IconButton>
        </div>
      </div>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #f0f0f0" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Reference No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Project
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Subject
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                From
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Document
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Remark
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Share
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {letters.map((letter) => (
              <TableRow key={letter.id} hover>
                <TableCell>{letter.date}</TableCell>
                <TableCell>{letter.referenceNo}</TableCell>
                <TableCell>{letter.project}</TableCell>
                <TableCell sx={{ maxWidth: 300 }}>{letter.subject}</TableCell>
                <TableCell>{letter.from}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Download size={18} className="text-green-600" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      letter.hasRemark ? "bg-green-100" : ""
                    )}
                  >
                    {letter.hasRemark && (
                      <span className="text-green-500 text-xs">✓</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<span className="text-green-500">↗</span>}
                    sx={{
                      color: "#8CC63F",
                      borderColor: "#8CC63F",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#7AB62F",
                        backgroundColor: "rgba(140, 198, 63, 0.04)",
                      },
                    }}
                  >
                    Share
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreVert size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
