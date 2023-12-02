// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import { rectDefaultStyle, squareDefaultStyle, tableDefaultStyle, textboxDefaultStyle, circleDefaultStyle, imageDefaultStyle, defaultPageStyle, lineDefaultStyle, tableCellDefaultStyle, tableHeadCellDefaultStyle } from "../Utils/DefaultStyles"
// import { _api } from "../Utils/Config/axiosConfig";

// const tableData = {
//     columns: [
//         { id: "table_headcell_" + 1, label: "Column A", dataField: "column_a", shrink: false, colspan: 1, style: tableHeadCellDefaultStyle },
//         { id: "table_headcell_" + 2, label: "Column B", dataField: "column_b", shrink: false, colspan: 1, style: tableHeadCellDefaultStyle },
//         { id: "table_headcell_" + 3, label: "Column C", dataField: "column_c", shrink: false, colspan: 1, style: tableHeadCellDefaultStyle },
//         { id: "table_headcell_" + 4, label: "Column D", dataField: "column_d", shrink: false, colspan: 1, style: tableHeadCellDefaultStyle }
//     ],
//     rows: [
//         {
//             id: 1,
//             cells: [
//                 {
//                     id: "table_cell_" + 1 + "_" + 1, rowId: 1, columnId: "table_headcell_" + 1, data: "A", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 1 + "_" + 2, rowId: 1, columnId: "table_headcell_" + 2, data: "B", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 1 + "_" + 3, rowId: 1, columnId: "table_headcell_" + 3, data: "C", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 1 + "_" + 4, rowId: 1, columnId: "table_headcell_" + 4, data: "D", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//             ]
//         },
//         {
//             id: 2,
//             cells: [
//                 {
//                     id: "table_cell_" + 2 + "_" + 1, rowId: 2, columnId: "table_headcell_" + 1, data: "E", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 2 + "_" + 2, rowId: 2, columnId: "table_headcell_" + 2, data: "F", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 2 + "_" + 3, rowId: 2, columnId: "table_headcell_" + 3, data: "G", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 2 + "_" + 4, rowId: 2, columnId: "table_headcell_" + 4, data: "H", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//             ]
//         },
//         {
//             id: 3,
//             cells: [
//                 {
//                     id: "table_cell_" + 3 + "_" + 1, rowId: 3, columnId: "table_headcell_" + 1, data: "I", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 3 + "_" + 2, rowId: 3, columnId: "table_headcell_" + 2, data: "J", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 3 + "_" + 3, rowId: 3, columnId: "table_headcell_" + 3, data: "K", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 3 + "_" + 4, rowId: 3, columnId: "table_headcell_" + 4, data: "L", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//             ]
//         },
//         {
//             id: 4,
//             cells: [
//                 {
//                     id: "table_cell_" + 4 + "_" + 1, rowId: 4, columnId: "table_headcell_" + 1, data: "M", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 4 + "_" + 2, rowId: 4, columnId: "table_headcell_" + 2, data: "N", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 4 + "_" + 3, rowId: 4, columnId: "table_headcell_" + 3, data: "O", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//                 {
//                     id: "table_cell_" + 4 + "_" + 4, rowId: 4, columnId: "table_headcell_" + 4, data: "P", style: tableCellDefaultStyle, shrink: false, rowspan: 1, colspan: 1, canGrow: false, canShrink: false, name: "tableCell",
//                     mergedToRow: "", mergedRows: [], mergedToCol: "", mergedCols: []
//                 },
//             ]
//         },

//     ]
// }



// export const saveEditorData = createAsyncThunk('editor/save', async (data, { rejectWithValue, getState }) => {
//     try {
//         console.log(getState().CustomSlice)
//         const _state = { ...getState().CustomSlice };

//         _state.rectangles = _state.rectangles.map((elem) => {
//             let _wrapperStyle = document.getElementById(elem.wrapperId).style;
//             return {
//                 ...elem,
//                 style: {
//                     ...elem.style,
//                     top: _wrapperStyle.top,
//                     left: _wrapperStyle.left,
//                     transform: _wrapperStyle.transform
//                 }
//             }
//         })

//         _state.squares = _state.squares.map((elem) => {
//             let _wrapperStyle = document.getElementById(elem.wrapperId).style;
//             return {
//                 ...elem,
//                 style: {
//                     ...elem.style,
//                     top: _wrapperStyle.top,
//                     left: _wrapperStyle.left,
//                     transform: _wrapperStyle.transform
//                 }
//             }
//         })

//         _state.circles = _state.circles.map((elem) => {
//             let _wrapperStyle = document.getElementById(elem.wrapperId).style;
//             return {
//                 ...elem,
//                 style: {
//                     ...elem.style,
//                     top: _wrapperStyle.top,
//                     left: _wrapperStyle.left,
//                     transform: _wrapperStyle.transform
//                 }
//             }
//         })

//         _state.lines = _state.lines.map((elem) => {
//             let _wrapperStyle = document.getElementById(elem.wrapperId).style;
//             return {
//                 ...elem,
//                 style: {
//                     ...elem.style,
//                     top: _wrapperStyle.top,
//                     left: _wrapperStyle.left,
//                     transform: _wrapperStyle.transform
//                 }
//             }
//         })

//         _state.images = _state.images.map((elem) => {
//             let _wrapperStyle = document.getElementById(elem.wrapperId).style;
//             return {
//                 ...elem,
//                 style: {
//                     ...elem.style,
//                     top: _wrapperStyle.top,
//                     left: _wrapperStyle.left,
//                     transform: _wrapperStyle.transform
//                 }
//             }
//         })

//         _state.textboxes = _state.textboxes.map((elem) => {
//             let _wrapperStyle = document.getElementById(elem.wrapperId).style;
//             return {
//                 ...elem,
//                 style: {
//                     ...elem.style,
//                     top: _wrapperStyle.top,
//                     left: _wrapperStyle.left,
//                     transform: _wrapperStyle.transform
//                 }
//             }
//         })

//         _state.tables = _state.tables.map((elem) => {
//             let _wrapperStyle = document.getElementById(elem.wrapperId).style;
//             return {
//                 ...elem,
//                 style: {
//                     ...elem.style,
//                     top: _wrapperStyle.top,
//                     left: _wrapperStyle.left,
//                     transform: _wrapperStyle.transform
//                 }
//             }
//         })

//         _state.selectedElement = {};
//         _state.selectedElementWrapper = { id: "", top: "0px", left: "0px", transform: "" };
//         _state.saveDataStatus = "idle"
//         _state.fetchDataStatus = "idle"

//         const _html = document.getElementById("editor").innerHTML;
//         const response = await _api.post("/report_editor/set", { ...data, "reportProperties": JSON.stringify(_state), reportHTMLData: _html });
//         // const response = await _api.post("/report_editor/set", { ...data, "reportData": JSON.stringify(_state) });
//         return response.data;
//     } catch (error) {
//         console.log(error)
//         return rejectWithValue(error);
//     }
// });


// export const fetchEditorData = createAsyncThunk('editor/fetch', async (data, { rejectWithValue }) => {
//     try {
//         if (!data || !data?.activeReportId || !data?.clientKey) {
//             return rejectWithValue("Id or key not found")
//         }
//         const response = await _api.post("/report_editor/get", data);
//         console.log(response)
//         if (response.status !== 200) {

//             return rejectWithValue(response)
//         }
//         return response.data;
//     } catch (error) {
//         console.log(error)
//         return rejectWithValue(error);
//     }
// });




// const initialState = {
//     pageStyle: defaultPageStyle,
//     rectangles: [],
//     squares: [],
//     lines: [],
//     circles: [],
//     textboxes: [],
//     tables: [],
//     images: [],
//     selectedElement: {},
//     selectedElementWrapper: { id: "", top: "0px", left: "0px", transform: "" },
//     lastId: {
//         rectangles: 0,
//         squares: 0,
//         circles: 0,
//         textboxes: 0,
//         tables: 0,
//         lines: 0,
//         images: 0
//     },
//     saveDataStatus: "idle",
//     saveDataError: "",
//     fetchDataStatus: "idle",
//     fetchDataError: "",

// }

// export const CustomSlice = createSlice(
//     {
//         name: "CustomSlice",
//         initialState: {
//             ...initialState
//         },
//         reducers: {
//             addRectangle(state, action) {
//                 state.rectangles.push({ id: "element_rect_" + (state.lastId.rectangles + 1), name: "rect", style: rectDefaultStyle, top: "0", left: "0", wrapperId: "element_rect_" + (state.lastId.rectangles + 1) + "_rect_wrap" })
//                 state.lastId.rectangles += 1;
//             },

//             addLine(state, action) {
//                 state.lines.push({ id: "element_line_" + (state.lastId.lines + 1), name: "line", style: lineDefaultStyle, top: "0", left: "0", wrapperId: "element_line_" + (state.lastId.lines + 1) + "_line_wrap" })
//                 state.lastId.lines += 1;
//             },
//             addSquare(state, action) {
//                 state.squares.push({ id: "element_square_" + (state.lastId.squares + 1), name: "square", style: squareDefaultStyle, top: "0", left: "0", wrapperId: "element_square_" + (state.lastId.squares + 1) + "_square_wrap" })
//                 state.lastId.squares += 1;
//             },
//             addCircle(state, action) {
//                 state.circles.push({ id: "element_circle_" + (state.lastId.circles + 1), name: "circle", style: circleDefaultStyle, top: "0", left: "0", wrapperId: "element_circle_" + (state.lastId.circles + 1) + "_circle_wrap" })
//                 state.lastId.circles += 1;
//             },
//             addTextbox(state, action) {
//                 state.textboxes.push({ id: "element_textbox_" + (state.lastId.textboxes + 1), name: "textbox", data: "", canGrow: false, canShrink: false, style: textboxDefaultStyle, top: "0", left: "0", wrapperId: "element_textbox_" + (state.lastId.textboxes + 1) + "_textbox_wrap" })
//                 state.lastId.textboxes += 1;
//             },
//             addTable(state, action) {
//                 state.tables.push({ id: "element_table_" + (state.lastId.tables + 1), name: "table", style: tableDefaultStyle, tableData, top: "0", left: "0", wrapperId: "element_table_" + (state.lastId.tables + 1) + "_table_wrap" })
//                 state.lastId.tables += 1;
//             },
//             addImage(state, action) {
//                 state.images.push({ id: "element_image_" + (state.lastId.images + 1), name: "image", src: action.payload, style: imageDefaultStyle, top: "0", left: "0", wrapperId: "element_image_" + (state.lastId.images + 1) + "_image_wrap" })
//                 state.lastId.images += 1;
//             },
//             setSelectedElement(state, action) {
//                 // debugger;
//                 state.selectedElement = action.payload

//                 if (action.payload.id === "editor") {
//                     state.pageStyle = action.payload.style
//                 }


//                 switch (action.payload.name) {
//                     case "rect":

//                         state.rectangles.forEach((elem) => {
//                             if (elem.id === action.payload.id) {
//                                 console.log(action.payload)
//                                 // console.log(elem.top)

//                                 elem.style = action.payload.style
//                                 // elem.top = action.payload.top
//                                 // elem.left = action.payload.left
//                             }


//                         })
//                         break;
//                     case "line":
//                         state.lines.forEach((elem) => {
//                             if (elem.id === action.payload.id) {
//                                 elem.style = action.payload.style
//                                 // elem.top = action.payload.top
//                                 // elem.left = action.payload.left
//                             }
//                         })
//                         break;
//                     case "square":
//                         state.squares.forEach((elem) => {
//                             if (elem.id === action.payload.id) {
//                                 elem.style = action.payload.style
//                                 // elem.top = action.payload.top
//                                 // elem.left = action.payload.left
//                             }
//                         })
//                         break;
//                     case "circle":
//                         state.circles.forEach((elem) => {
//                             if (elem.id === action.payload.id) {
//                                 elem.style = action.payload.style
//                                 // elem.top = action.payload.top
//                                 // elem.left = action.payload.left

//                             }
//                         })
//                         break;
//                     case "textbox":
//                         state.textboxes.forEach((elem) => {
//                             if (elem.id === action.payload.id) {
//                                 elem.style = action.payload.style
//                                 elem.canGrow = action.payload.canGrow
//                                 elem.canShrink = action.payload.canShrink
//                                 // elem.top = action.payload.top
//                                 // elem.left = action.payload.left
//                             }
//                         })
//                         break;
//                     case "table":
//                         state.tables.forEach((elem) => {

//                             if (elem.id === action.payload.id) {

//                                 elem.style = action.payload.style
//                                 // elem.top = action.payload.top
//                                 // elem.left = action.payload.left
//                             }
//                         })
//                         break;
//                     case "tableCell":
//                         state.tables.forEach((_table) => {
//                             if (_table.id === action.payload.tableId) {
//                                 _table.tableData.rows.forEach((_row) => {
//                                     _row.cells.forEach(
//                                         (elem) => {
//                                             if (elem.id === action.payload.id.replace(action.payload.tableId+"_","")) {

//                                                 elem.style = action.payload.style
//                                                 elem.canGrow = action.payload.canGrow
//                                                 elem.canShrink = action.payload.canShrink
//                                                 elem.data = action.payload.data
//                                                 elem.top = action.payload.top
//                                                 elem.left = action.payload.left
//                                             }
//                                         }
//                                     )

//                                 })
//                             }

//                         })
//                         break;
//                     case "image":
//                         state.images.forEach((elem) => {
//                             if (elem.id === action.payload.id) {
//                                 elem.style = action.payload.style
//                                 // elem.top = action.payload.top
//                                 // elem.left = action.payload.left
//                             }
//                         })
//                         break;
//                     default:
//                         break;
//                 }

//             },
//             removeSelectedElement(state, action) {
//                 state.selectedElement = action.payload


//                 switch (action.payload.name) {
//                     case "rect":
//                         state.rectangles = state.rectangles.filter(
//                             (rect) => {
//                                 // console.log("deleteeeeeee", rect.id ,action.payload)
//                                 return rect.id !== action.payload.id
//                             }
//                         )
//                         state.selectedElement = { id: "" }
//                         break;
//                     case "line":
//                         state.lines = state.lines.filter(
//                             (line) => {

//                                 return line.id !== action.payload.id
//                             }
//                         )
//                         state.selectedElement = { id: "" }
//                         break;
//                     case "square":
//                         state.squares = state.squares.filter(
//                             (square) => {

//                                 return square.id !== action.payload.id
//                             }
//                         )
//                         state.selectedElement = { id: "" }
//                         break;
//                     case "circle":
//                         state.circles = state.circles.filter(
//                             (circle) => {

//                                 return circle.id !== action.payload.id
//                             }
//                         )
//                         state.selectedElement = { id: "" }
//                         break;
//                     case "textbox":
//                         state.textboxes = state.textboxes.filter(
//                             (textbox) => {

//                                 return textbox.id !== action.payload.id
//                             }
//                         )
//                         state.selectedElement = { id: "" }
//                         break;
//                     case "table":
//                         state.tables = state.tables.filter(
//                             (table) => {

//                                 return table.id !== action.payload.id
//                             }
//                         )
//                         state.selectedElement = { id: "" }
//                         break;

//                     case "image":
//                         state.images = state.images.filter(
//                             (image) => {

//                                 return image.id !== action.payload.id
//                             }
//                         )
//                         state.selectedElement = { id: "" }
//                         break;
//                     default:
//                         break;
//                 }

//             },
//             setPageStyle(state, action) {
//                 state.pageStyle = action.payload
//             },
//             setSelectedElementWrapper(state, action) {
//                 state.selectedElementWrapper = action.payload
//             },
//             modifySelectedElement(state, action) {
//                 // console.log(action.payload)
//                 try {
//                     action.payload.forEach(
//                         (elem) => {
//                             state.selectedElement.style[elem.key] = elem.value
//                         }
//                     )
//                 } catch (err) {
//                     console.log("DJVNJDBFVHB", err)
//                 }

//             },
//             setElements(state, action) {
//                 if (action.payload.name === "rect") {
//                     state.rectangles = action.payload.elements
//                 }
//                 if (action.payload.name === "square") {
//                     state.squares = action.payload.elements
//                 }
//                 if (action.payload.name === "circle") {
//                     state.circles = action.payload.elements
//                 }
//                 if (action.payload.name === "textbox") {
//                     state.textboxes = action.payload.elements
//                 }
//                 if (action.payload.name === "table") {
//                     state.tables = action.payload.elements
//                 }
//                 if (action.payload.name === "image") {
//                     state.images = action.payload.elements
//                 }

//             },
//             setTableData(state, action) {
//                 state.tables.forEach((elem) => {

//                     if (elem.id === action.payload.id) {

//                         elem.tableData = action.payload.tableData
//                     }
//                 })
//             },
//             setTextboData(state, action) {
//                 state.textboxes.forEach((elem) => {

//                     if (elem.id === action.payload.id) {

//                         elem.data = action.payload.data
//                     }
//                 })
//             }
//         },
//         extraReducers: (builder) => {
//             builder
//                 .addCase(fetchEditorData.pending, (state) => {
//                     state.fetchDataStatus = 'pending';
//                     // state.error = ""
//                 })
//                 .addCase(fetchEditorData.fulfilled, (state, action) => {
//                     state.fetchDataStatus = 'success';


//                     const newState = JSON.parse(action.payload.reportProperties || {})
//                     // const newState = JSON.parse(action.payload.reportData)

//                     const { pageStyle,
//                         rectangles,
//                         squares,
//                         lines,
//                         circles,
//                         textboxes,
//                         tables,
//                         images,
//                         selectedElement,
//                         selectedElementWrapper,
//                         lastId } = newState 

//                     // state.pageStyle = pageStyle
//                     // state.rectangles = rectangles.map(
//                     //     (elem) => {
//                     //         return {
//                     //             ...elem,
//                     //             style: {
//                     //                 ...elem.style,
//                     //                 // top: elem.top,
//                     //                 // left: elem.left
//                     //             }
//                     //         }
//                     //     }
//                     // )
//                     // state.squares = squares.map(
//                     //     (elem) => {
//                     //         return {
//                     //             ...elem,
//                     //             style: {
//                     //                 ...elem.style,
//                     //                 // top: elem.top,
//                     //                 // left: elem.left
//                     //             }
//                     //         }
//                     //     }
//                     // )
//                     // state.lines = lines.map(
//                     //     (elem) => {
//                     //         return {
//                     //             ...elem,
//                     //             style: {
//                     //                 ...elem.style,
//                     //                 // top: elem.top,
//                     //                 // left: elem.left
//                     //             }
//                     //         }
//                     //     }
//                     // )
//                     // state.circles = circles.map(
//                     //     (elem) => {
//                     //         return {
//                     //             ...elem,
//                     //             style: {
//                     //                 ...elem.style,
//                     //                 // top: elem.top,
//                     //                 // left: elem.left
//                     //             }
//                     //         }
//                     //     }
//                     // )
//                     // state.textboxes = textboxes.map(
//                     //     (elem) => {
//                     //         return {
//                     //             ...elem,
//                     //             style: {
//                     //                 ...elem.style,
//                     //                 // top: elem.top,
//                     //                 // left: elem.left
//                     //             }
//                     //         }
//                     //     }
//                     // )
//                     // state.tables = tables.map(
//                     //     (elem) => {
//                     //         return {
//                     //             ...elem,
//                     //             style: {
//                     //                 ...elem.style,
//                     //                 // top: elem.top,
//                     //                 // left: elem.left
//                     //             }
//                     //         }
//                     //     }
//                     // )
//                     // state.images = images.map(
//                     //     (elem) => {
//                     //         return {
//                     //             ...elem,
//                     //             style: {
//                     //                 ...elem.style,
//                     //                 // top: elem.top,
//                     //                 // left: elem.left
//                     //             }
//                     //         }
//                     //     }
//                     // )
//                     // state.selectedElement = selectedElement
//                     // state.selectedElementWrapper = selectedElementWrapper
//                     // state.lastId = lastId

//                     state.pageStyle = pageStyle || initialState.pageStyle
//                     state.rectangles = rectangles || initialState.rectangles
//                     state.squares = squares || initialState.squares
//                     state.lines = lines || initialState.lines
//                     state.circles = circles || initialState.circles
//                     state.textboxes = textboxes || initialState.textboxes
//                     state.tables = tables || initialState.tables
//                     state.images = images || initialState.images
//                     state.selectedElement = selectedElement || initialState.selectedElement
//                     state.selectedElementWrapper = selectedElementWrapper || initialState.selectedElementWrapper
//                     state.lastId = lastId || initialState.lastId
//                     state.fetchDataError = initialState.fetchDataError
//                     state.saveDataError = initialState.saveDataError
//                     state.saveDataStatus = "idle"
//                     state.fetchDataStatus = "idle"
//                 })
//                 .addCase(fetchEditorData.rejected, (state, action) => {
//                     state.fetchDataStatus = 'error';
//                     state.fetchDataError = action.payload.data.errors ? action.payload.data.errors[0] : "Failed to Fetch Template";
//                 })
//                 .addCase(saveEditorData.pending, (state, action) => {
//                     state.saveDataStatus = 'pending';
//                     state.saveDataError = ""
//                 })
//                 .addCase(saveEditorData.fulfilled, (state, action) => {
//                     state.saveDataStatus = 'success';
//                     state.saveDataError = ""
//                 })

//                 .addCase(saveEditorData.rejected, (state, action) => {
//                     state.saveDataStatus = 'error';
//                     console.log(action.payload)
//                     state.saveDataError = action.payload.errors ? action.payload.errors[0] : "Failed to Save Template";
//                 })
//         },

//     }
// )

// export const { addRectangle, addLine, removeSelectedElement,
//     setSelectedElement, setPageStyle, modifySelectedElement,
//     setSelectedElementWrapper,
//     addSquare, addCircle, addTextbox, addTable, addImage,
//     setElements, setTableData, setTextboData } = CustomSlice.actions;

// export default CustomSlice.reducer

// export const getPageStyle = (state) => state.CustomSlice.pageStyle
// export const getRectangles = (state) => state.CustomSlice.rectangles
// export const getLines = (state) => state.CustomSlice.lines
// export const getSquares = (state) => state.CustomSlice.squares
// export const getCircles = (state) => state.CustomSlice.circles
// export const getTextboxes = (state) => state.CustomSlice.textboxes
// export const getTables = (state) => state.CustomSlice.tables
// export const getImages = (state) => state.CustomSlice.images
// export const getSelectedElement = (state) => state.CustomSlice.selectedElement
// export const getSelectedElementWrapper = (state) => state.CustomSlice.selectedElementWrapper
// export const getSaveDataStatus = (state) => state.CustomSlice.saveDataStatus
// export const getFetchDataStatus = (state) => state.CustomSlice.fetchDataStatus
// export const getDesignFetchError = (state) => state.CustomSlice.fetchDataError
// export const getDesignSaveError = (state) => state.CustomSlice.saveDataError

