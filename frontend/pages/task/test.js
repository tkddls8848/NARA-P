import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'dminsttNm',
    headerName: 'dminsttNm',
    width: 150,
    editable: true,
  },
  {
    field: 'bidNtceNm',
    headerName: '사업명',
    width: 150,
    editable: true,
  },
  {
    field: 'bidNtceDt',
    headerName: '접수등록',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'bidClseDt',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const column = ["기관명", "사업명", "접수등록", "마감", "파일링크1"]
const row = ["기관명", "사업명", "접수등록", "마감", "파일링크1"]
export default function Test({fromServer, type}) {
  console.log("FROM", fromServer)
  "기관명 : dminsttNm"

  "사업명 : bidNtceNm"

  "접수등록 : bidNtceDt"

  "마감 : bidClseDt"

  "파일링크1 : ntceSpecDocUrl1"

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

export const getServerSideProps = async () => {

  let fromServer = await axios.get('http://localhost:5000/sajeon')
  const type = Object.keys(fromServer.data)
  fromServer = fromServer.data[type]

  console.log("Ftype",type)
  console.log("Fdata",fromServer)

  return {
    props: {
      fromServer,
      type
    }
  }
}