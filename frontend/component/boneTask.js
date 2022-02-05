import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, Link } from '@mui/material'

const BoneTask = ({task}) => {
  let flag = 'New'
  if(!task.isNew){
    flag = "Not new"
  }

  return(  
    <Card variant='outlined'>
      <CardContent>
        <Typography component='div'>isNew : {flag}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.dminsttNm}>기관명 : {task.dminsttNm}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.bidNtceNm}>사업명 : {task.bidNtceNm.slice(0,20)}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.bidNtceDt}>접수등록 : {task.bidNtceDt}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.bidClseDt}>마감 : {task.bidClseDt}</Typography>    
        <Typography component='div' key= {task.bidNtceNo + task.ntceSpecDocUrl1}>파일링크1 : <Link underline="hover" href={task.ntceSpecDocUrl1}>다운로드 링크</Link></Typography>
      </CardContent>
    </Card>
  )}

export default BoneTask