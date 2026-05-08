import React from 'react';

const Table = ({ columns, data }) => {
    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px"
            }}
        >
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                // background: "#f4f4f4",
                                textAlign: "left",
                                borderRadius: "12px"
                            }}
                        >
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td
                            colSpan={columns.length}
                            style={{ padding: "10px", textAlign: "center" }}
                        >
                            No data found
                        </td>
                    </tr>
                ) : (
                    data.map((row) => (
                        <tr key={row._id}>
                            {columns.map((col) => {
                                const value = col.render ? col.render(row) : row[col.key];
                                return (
                                    <td
                                        key={col.key}
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            Align: "left"
                                        }}
                                    >
                                        {typeof value === 'object' && value !== null
                                            ? JSON.stringify(value)
                                            : value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default Table;