import { useEffect, useMemo, useState } from "react";
import { faArrowDown, faArrowRight, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tableCellDefaultStyle, tableHeadCellDefaultStyle, tableRowDefaultStyle } from "../../Utils/DefaultStyles";
import { useDispatch } from "react-redux";
import { getSelectedElement, setSelectedElement, setTableData } from "../../Store/CustomSlice";
import { useSelector } from "react-redux";
import { calculateFontSize } from "../../Utils/utils";

export default function Table({ id, _table, style, focused }) {

    /**Helpers */
    const dispatch = useDispatch()

    /** State Selectors */
    const selectedElement = useSelector(getSelectedElement)
    const [domTextarea, setDomTextarea] = useState();

    /**MutableState */
    const [startEdit, setStartEdit] = useState(false)

    const [_tableData, set_TableData] = useState(_table.tableData)


    const maxColumnId = useMemo(
        () => {
            return Math.max(..._tableData.columns.map(
                (column) => column.id?.replace("table_headcell_", "")
            ))
        }, [_tableData]
    )

    const maxRowId = useMemo(
        () => {

            return parseInt(Math.max(..._tableData.rows.map(
                (row) => row.id
            )))
        }, [_tableData]
    )

    /**Variables */


    /**Methods */
    function addNewRow() {
        let no_of_cells = _tableData.columns.length;
        let no_of_rows = _tableData.rows.length;
        let newRowCells = [];
        for (let i = 0; i < no_of_cells; i++) {
            let columnId = _tableData.columns[i].id;
            newRowCells.push({ id: "table_cell_" + (no_of_rows + 1) + "_" + (i + 1), columnId, rowId: maxRowId + 1, data: "", shrink: false, rowspan: 1, colspan: 1, style: tableCellDefaultStyle, canGrow: false, name: "tableCell" })
        }
        // set_TableData({ ..._tableData, rows: [..._tableData.rows, { id: maxRowId + 1, cells: newRowCells }] })
        dispatch(setTableData({ id: _table.id, tableData: { ..._tableData, rows: [..._tableData.rows, { id: maxRowId + 1, cells: newRowCells }] } }))

    }

    function addNewColumn() {
        // console.log("kndfgfjghfjghjhfj", "add col", maxColumnId + 1)
        let newColumCell = { id: "table_headcell_" + maxColumnId + 1, label: "", dataField: "", colspan: 1, shrink: false, style: tableHeadCellDefaultStyle };
        let modified_columns = [..._tableData.columns, newColumCell]
        let no_of_cells = _tableData.columns.length;

        let modified_rows = _tableData.rows.map(
            (row, index) => {
                return {
                    ...row,
                    cells: [...row.cells, { id: "table_cell_" + row.id + "_" + (no_of_cells + 1), rowId: row.id, columnId: "table_headcell_" + maxColumnId + 1, data: "", rowspan: 1, colspan: 1, style: tableCellDefaultStyle, canGrow: false, name: "tableCell" }]
                }
            }
        )
        // set_TableData({ columns: modified_columns, rows: modified_rows })
        dispatch(setTableData({ id: _table.id, tableData: { columns: modified_columns, rows: modified_rows } }))

    }

    function removeColumn(columnId, columnIndex, colspan) {
        let modified_columns = _tableData.columns.filter(
            (column) => {
                return column.id !== columnId
            }
        )

        let __mergedCols = [];
        let modified_rows = _tableData.rows.map(
            (row) => {
                return {
                    ...row,
                    cells: row.cells.filter(
                        (cell) => {
                            return cell.columnId !== columnId
                        }
                    ).map(
                        (cell) => {
                            if (cell.mergedCols.find((_mergedCol) => _mergedCol === columnId)) {
                                __mergedCols = [...cell.mergedCols]

                                return {
                                    ...cell,
                                    colspan: 1,
                                    mergedCols: cell.mergedCols.filter(
                                        (elem) => {
                                            return elem !== columnId
                                        }
                                    )
                                }
                            } else {
                                return cell
                            }
                        }
                    ).map(
                        (_cell) => {
                            if (__mergedCols.find((_mergedCol) => _mergedCol === _cell.columnId)) {
                                return {
                                    ..._cell,
                                    shrink: false
                                }
                            }
                            return {
                                ..._cell
                            }
                        }
                    ).map(
                        (cell, cIndex) => {

                            if (cell.shrink === true && cell.mergedToCol === columnId) {
                                return {
                                    ...cell,
                                    shrink: false
                                }
                            }
                            return cell
                        }
                    )
                }
            }
        )
        // set_TableData({ columns: modified_columns, rows: modified_rows })
        dispatch(setTableData({ id: _table.id, tableData: { columns: modified_columns, rows: modified_rows } }))

    }

    function removeRow(rowId, rowIndex) {
        let __mergedRows = [];
        let modified_rows = _tableData.rows.filter(
            (row) => {
                return row.id !== rowId
            }
        ).map(
            (row, rIndex) => {
                return {
                    ...row,
                    cells: row.cells.map(
                        (cell) => {

                            if (cell.mergedRows.find((_mergedRow) => _mergedRow === rowId)) {
                                __mergedRows = [...cell.mergedRows]

                                return {
                                    ...cell,
                                    rowspan: 1,
                                    mergedRows: cell.mergedRows.filter(
                                        (elem) => {
                                            return elem !== rowId
                                        }
                                    )
                                }
                            } else {
                                return cell
                            }
                        }
                    ).map(
                        (_cell) => {
                            if (__mergedRows.find((_mergedRow) => _mergedRow === _cell.rowId)) {
                                return {
                                    ..._cell,
                                    shrink: false
                                }
                            }
                            return {
                                ..._cell
                            }
                        }
                    ).map(
                        (cell, cIndex) => {

                            if (cell.shrink === true && cell.mergedToRow === rowId) {
                                return {
                                    ...cell,
                                    shrink: false
                                }
                            }
                            return cell
                        }
                    )
                }
            }
        )

        // set_TableData({ ..._tableData, rows: modified_rows })
        dispatch(setTableData({ id: _table.id, tableData: { ..._tableData, rows: modified_rows } }))
    }

    function handleCellFocus(event, element) {
        let _domelem = document.getElementById(id + "_" + element.id + "_textarea");
        setDomTextarea(_domelem)
        dispatch(
            setSelectedElement({ ...element, id: id + "_" + element.id, tableId: id })
        )

    }

    const mergeRows = (rowIndex, cellIndex, rowspan, colspan, rowId) => {
        let _currentCell = {};
        const updatedRows = _tableData.rows.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                const updatedCells = row.cells.map((cell, cIndex) => {
                    if (cIndex === cellIndex) {
                        _currentCell = { ...cell, rowspan: cell.rowspan + 1, }
                        return {
                            ...cell,
                            rowspan: cell.rowspan + 1,
                        };
                    }
                    return cell;
                });
                return {
                    ...row,
                    cells: updatedCells,
                };
            } else if (rIndex === rowIndex + rowspan) {
                const updatedCells = row.cells.map((cell, cIndex) => {
                    if (cIndex >= cellIndex && cIndex < cellIndex + colspan) {
                        _currentCell.mergedRows = [..._currentCell.mergedRows, cell.rowId]
                        if (cell.rowspan > 1) {

                            return {
                                ...cell,
                                rowspan: cell.rowspan - 1
                            };

                        }
                        return {
                            ...cell,
                            mergedToRow: rowId,
                            data: "",
                            shrink: true, // Reset rowspan for adjacent cell
                        };
                    }
                    return cell;
                })
                return {
                    ...row,
                    cells: updatedCells,
                };
            }
            return row;
        }).map((row, rIndex) => {
            if (rIndex === rowIndex) {
                const updatedCells = row.cells.map((cell, cIndex) => {
                    if (cIndex === cellIndex) {
                        return {
                            ..._currentCell,
                        };
                    } else {
                        return cell
                    }
                });
                return {
                    ...row,
                    cells: updatedCells,
                };
            }
            return row;
        })

        // setTableData({ ..._tableData, rows: updatedRows });
        dispatch(setTableData({ id: _table.id, tableData: { ..._tableData, rows: updatedRows } }))


    };

    const mergeCells = (rowIndex, cellIndex, colspan, rowspan, columnId) => {
        const updatedRows = _tableData.rows.map((row, rIndex) => {
            let _currentCell = {};
            if (rIndex >= rowIndex && rIndex < rowIndex + rowspan) {
                const updatedCells = row.cells.map((cell, cIndex) => {
                    if (cIndex === cellIndex) {
                        _currentCell = { ...cell, colspan: cell.colspan + 1, }
                        return {
                            ...cell,
                            colspan: cell.colspan + 1,
                        };
                    } else if (cIndex === cellIndex + colspan) {
                        _currentCell.mergedCols = [..._currentCell.mergedCols, cell.columnId]

                        if (cell.colspan > 1) {
                            return {
                                ...cell,
                                colspan: cell.colspan - 1,
                            };
                        }

                        return {
                            ...cell,
                            mergedToCol: columnId,
                            data: "",
                            shrink: true
                        };
                    }
                    return cell;
                }).map(
                    (cell, cIndex) => {
                        if (cIndex === cellIndex) {

                            return {
                                ..._currentCell,

                            };
                        } else {
                            return cell
                        }
                    }
                );
                return {
                    ...row,
                    cells: updatedCells,
                };
            }
            return row;
        });

        // setTableData({ ..._tableData, rows: updatedRows });
        dispatch(setTableData({ id: _table.id, tableData: { ..._tableData, rows: updatedRows } }))


    };

    // const mergeHeaderCells = (cellIndex, colspan) => {
    //     const updatedCols = _tableData.columns.map((cell, cIndex) => {


    //         if (cIndex === cellIndex) {
    //             return {
    //                 ...cell,
    //                 colspan: cell.colspan + 1,
    //             };
    //         } else if (cIndex === cellIndex + colspan) {
    //             if (cell.colspan > 1) {
    //                 return {
    //                     ...cell,
    //                     colspan: cell.colspan - 1,
    //                 };
    //             }
    //             return {
    //                 ...cell,
    //                 shrink: true
    //             };
    //         }
    //         return cell;




    //     });

    //     setTableData({ ..._tableData, columns: updatedCols });
    // };

    /**Effects */
    useEffect(
        () => {

            set_TableData(_table.tableData)
        }, [_table.tableData]
    )





    return (

        <>

            <div key={id} style={{ borderRadius: "inherit", }} className={`min-w-fit   overflow-hidden text-sm flex items-stretch gap-2 justify-between ${(focused) && "  z-[20]"} `} onDoubleClick={() => setStartEdit(!startEdit)} >
                <table className="w-full border-collapse block " id={id} style={{ ...style, transform: "", backgroundColor: _table.style.backgroundColor }} border={1}>
                    {focused &&

                        <thead className={` w-full   ${focused && 'border-r'} border-collapse `} >
                            <tr className="table-row w-full h-full border-collapse " style={tableRowDefaultStyle} >

                                {
                                    _tableData.columns.map(
                                        (columnCell, index) => {
                                            return (
                                                <th id={id + "_" + columnCell.id}
                                                    colSpan={columnCell.colspan}
                                                    style={columnCell.style} className={`${index !== 0 && "  "} ${columnCell.shrink ? "hidden " : " table-cell "}  relative w-full  justify-center  items-center     `}
                                                    key={columnCell.id + "HEAD"}>
                                                    <input type="text"
                                                        style={{ textDecoration: "inherit", letterSpacing: "inherit", fontFamily: "inherit", fontStyle: "inherit", textAlign: "inherit" }}
                                                        onClick={(event) => { handleCellFocus(event, columnCell) }}
                                                        value={columnCell.label}

                                                        className="outline-none hidden p-1 table_head_input text-center bg-transparent border-collapse  h-full" />

                                                    <span className="select-none p-1">{columnCell.label}</span>

                                                    {
                                                        focused &&
                                                        <div key={index + "_delete_btn"} className="text-sm rounded-full mb-2 ml-2 float-left bg-red-500  cursor-pointer w-[1.1rem]  flex text-center justify-center items-center h-[1rem] text-white mr-2 shadow-md border border-red-500" onClick={() => removeColumn(columnCell.id, index, columnCell.colspan)}>

                                                            <FontAwesomeIcon icon={faMinus} className="text-[10px]  h-full text-center" />
                                                        </div>

                                                    }
                                                    {/* {!columnCell.shrink && selectedElement.id === columnCell.id && <>
                                                 
                                                    <button className="  bg-white rounded-full h-[1rem] w-[1rem] border border-[#74C0FC] text-[#74C0FC]  cursor-pointer flex flex-col gap-0  hover:shadow-sm hover:scale-105  justify-center items-center text-sm absolute  animate__animated  animate__fadeInLeft animate__faster z-50 top-[0.1rem] right-[-0.5rem] " onClick={() => mergeHeaderCells( index, columnCell.colspan)}>
                                                        <FontAwesomeIcon icon={faArrowRight} className="text-[0.8em]" />

                                                    </button>
                                                </>

                                                } */}
                                                </th>


                                            )
                                        }
                                    )
                                }
                                <td className="p-1"></td>

                            </tr>
                        </thead>
                    }
                    <tbody border={1} style={{ backgroundColor: style.backgroundColor }} className={` w-full  ${focused && 'border-r'}  border-collapse border-[#1d1d1d] `} >


                        {

                            _tableData.rows.map(

                                (row, rowindex) => {
                                    return (
                                        <>
                                            <tr className={`table-row w-max border-collapse   h-full `} key={row.id + "ROW"}>


                                                {
                                                    row.cells.map(
                                                        (cell, index) => {

                                                            return (
                                                                <td id={id + "_" + cell.id} style={
                                                                    {
                                                                        ...cell.style,

                                                                        paddingBottom: "",
                                                                        paddingLeft: "",
                                                                        paddingRight: "",
                                                                        paddingTop: "",
                                                                    }
                                                                }
                                                                    rowSpan={cell.rowspan}
                                                                    colSpan={cell.colspan}
                                                                    className={`${cell.shrink ? "hidden " : " table-cell "}  overflow-hidden  relative z-[1] justify-center flex-col items-center  ${index === 0 ? "" : "  "} h-max  border-[#1d1d1d] `}
                                                                    key={cell.id + "CELL"}  >

                                                                    <div className=" h-full flex justify-center items-center flex-col gap-1 py- z-[1] w-full " style={{ height: cell.canGrow ? " auto " : " inherit ", width: "inherit", backgroundColor: "transparent", fontFamily: selectedElement.id === id ? style.fontFamily : "inherit", fontSize: selectedElement.id === id ? style.fontSize : "inherit", }}>
                                                                        <textarea type="text" value={cell.data} id={id + "_" + cell.id + "_textarea"}
                                                                            style={
                                                                                {
                                                                                    width: "100%",
                                                                                    height: cell.canGrow ? domTextarea.scrollHeight : "inherit",
                                                                                    backgroundColor: "transparent",
                                                                                    textDecoration: "inherit",
                                                                                    fontFamily: "inherit",
                                                                                    letterSpacing: "inherit",
                                                                                    fontStyle: "inherit",
                                                                                    fontSize: cell.canShrink ? calculateFontSize(cell.style.width, cell.style.fontSize) : "inherit",
                                                                                    textAlign: "inherit",
                                                                                    paddingBottom: cell.style.paddingBottom,
                                                                                    paddingLeft: cell.style.paddingLeft,
                                                                                    paddingRight: cell.style.paddingRight,
                                                                                    paddingTop: cell.style.paddingTop,
                                                                                    overflow:"hidden"
                                                                                }
                                                                            }
                                                                        rows={1}
                                                                        onKeyDown={(e) => e.stopPropagation()}
                                                                        onChange={(event) => {
                                                                            // setTableData({
                                                                            //     ..._tableData, rows: _tableData.rows.map(
                                                                            //         (_row) => {

                                                                            //             return {
                                                                            //                 ..._row, cells: _row.cells.map(
                                                                            //                     (_cell) => {
                                                                            //                         if (_cell.id === cell.id && _cell.rowId === cell.rowId) {

                                                                            //                             return { ..._cell, data: event.target.value }
                                                                            //                         }
                                                                            //                         return _cell
                                                                            //                     }
                                                                            //                 )
                                                                            //             }

                                                                            //         }
                                                                            //     )
                                                                            // })


                                                                            dispatch(setSelectedElement({ ...selectedElement, id: id + "_" + cell.id, data: event.target.value }))
                                                                            if (cell.canGrow) return
                                                                            domTextarea.style.height = 'auto';
                                                                            domTextarea.style.height = (domTextarea.scrollHeight) + 'px';
                                                                        }}
                                                                        cols={cell.canGrow ? cell.data.length : ""}
                                                                        onClick={(event) => { handleCellFocus(event, cell) }} className="z-[1] w-[100px] overflow-hidden resize-none bg-red-100  duration-200 border-none py-1 px-2  outline-none bg- text-center h-full " ></textarea>

                                                                    {!cell.shrink && selectedElement.id === id + "_" + cell.id && <>
                                                                        <button key={index + "mergerrow"} className="  bg-white rounded-full h-[1rem] w-[1rem] text-center border border-[#74C0FC] text-[#74C0FC] justify-center hover:shadow-sm hover:scale-105 z-[999]  cursor-pointer flex animate__animated  animate__fadeInDown animate__faster items-center text-sm absolute  left-[0.5rem] bottom-[-0.5rem]" onClick={() => mergeRows(rowindex, index, cell.rowspan, cell.colspan, cell.rowId)}>

                                                                            <FontAwesomeIcon icon={faArrowDown} className="text-[0.8em] text-center" />

                                                                        </button>
                                                                        <button key={index + "mergecells"} className="  bg-white rounded-full h-[1rem] w-[1rem] border border-[#74C0FC] text-[#74C0FC]  cursor-pointer flex flex-col gap-0  hover:shadow-sm hover:scale-105  justify-center animate__animated  animate__fadeInLeft animate__faster items-center text-sm absolute z-[2] top-[0.5rem] right-[-0.5rem] " onClick={() => mergeCells(rowindex, index, cell.colspan, cell.rowspan, cell.columnId)}>
                                                                            <FontAwesomeIcon icon={faArrowRight} className="text-[0.8em]" />

                                                                        </button>
                                                                    </>

                                                                    }
                                                                </div>
                                                                </td>

                                            )
                                                        }
                                            )
                                                }

                                            {
                                                focused &&
                                                <span key={"lastCELL"} className=" text-sm rounded-full mb- ml-2 float-left bg-red-500 mt-1 cursor-pointer w-[1.1rem]  flex text-center justify-center items-center h-[1rem] text-white mr-2 shadow-md border border-red-500" onClick={() => removeRow(row.id, rowindex)}>

                                                    <FontAwesomeIcon icon={faMinus} className="text-[10px]  h-full text-center" />
                                                </span>

                                            }

                                        </tr >

                                        </>
                    )
                                }
                    )
                        }
                </tbody>


            </table >
            <div key="last_HEAD" className={`flex flex-col items-center p-1  h-full  ${focused ? " flex z-[20] " : " hidden"} `}>
                <div title="Add New Column" className="add_col_btn text-sm rounded-full h-[1.5rem] w-[1.5rem] flex bg-white  hover:rotate-180 duration-200 justify-center items-center cursor-pointer border  shadow-md " onClick={addNewColumn}><span><FontAwesomeIcon icon={faPlus} /></span></div>


            </div>

        </div >

            <div className={`flex py-2 gap-2 bg-white  border-[#1d1d1d] border-collapse  px-5  ${focused ? " flex z-[20] " : " hidden"}`}>
                <div title="Add New Row" className="add_row_btn text-sm rounded-full h-[1.5rem] w-[1.5rem]  hover:rotate-180 duration-200 flex justify-center items-center cursor-pointer border hover:scale-105 shadow-md " onClick={addNewRow}><span><FontAwesomeIcon icon={faPlus} /></span></div>

            </div>

        </>
    )
}