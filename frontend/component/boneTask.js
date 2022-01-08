import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const BoneTask = ({task}) => (
    <Card variant='outlined' key={task.bidNtceNo}>
      <CardContent key={task.bidNtceNo}>
        <Typography component='div' key= {task.dminsttNm}>기관명 : {task.dminsttNm}</Typography>
        <Typography component='div' key= {task.bidNtceNm}>사업명 : {task.bidNtceNm}</Typography>
        <Typography component='div' key= {task.bidNtceDt}>접수등록 : {task.bidNtceDt}</Typography>
        <Typography component='div' key= {task.bidClseDt}>마감 : {task.bidClseDt}</Typography>
        <Typography component='div' key= {task.ntceSpecDocUrl1}>파일링크1 : <Button><Link href={task.ntceSpecDocUrl1}>다운로드 링크</Link></Button></Typography>
      </CardContent>
    </Card>
)

export default BoneTask