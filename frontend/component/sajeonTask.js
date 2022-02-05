import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, Link } from '@mui/material'

const SajeonTask = ({task}) => {
  let flag = 'New'
  if(!task.isNew){
    flag = "Not new"
  }

  return (
        <Card variant='outlined'>
          <CardContent>
            <Typography component='div'>isNew : {flag}</Typography>
            <Typography component='div' key={task.rlDminsttNm}>기관명 : {task.rlDminsttNm}</Typography>
            <Typography component='div' key={task.prdctClsfcNoNm}>사업명 : {task.prdctClsfcNoNm.slice(0,20)}</Typography>
            <Typography component='div' key={task.rcptDt}>접수등록 : {task.rcptDt}</Typography>
            <Typography component='div' key={task.opninRgstClseDt}>마감 : {task.opninRgstClseDt}</Typography>
            <Typography component='div' key={task.specDocFileUrl1}>다운로드1 : <Link underline='hover' href={task.specDocFileUrl1}>다운로드</Link></Typography>
          </CardContent>
        </Card>
  )
}

export default SajeonTask