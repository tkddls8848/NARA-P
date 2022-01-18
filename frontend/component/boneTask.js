import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const BoneTask = ({task}) => (
    <Card variant='outlined'>
      <CardContent>
        <Typography component='div' key= {task.bidNtceNo + task.dminsttNm}>기관명 : {task.dminsttNm}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.bidNtceNm}>사업명 : {task.bidNtceNm.slice(0,20)}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.bidNtceDt}>접수등록 : {task.bidNtceDt}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.bidClseDt}>마감 : {task.bidClseDt}</Typography>
        <Typography component='div' key= {task.bidNtceNo + task.ntceSpecDocUrl1}>파일링크1 : <Button><Link href={task.ntceSpecDocUrl1}>다운로드 링크</Link></Button></Typography>
      </CardContent>
    </Card>
)

export default BoneTask