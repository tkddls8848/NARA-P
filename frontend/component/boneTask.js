import Link from 'next/link'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid, Paper } from '@mui/material';

const BoneTask = ({task}) => (
  <Box sx={{ flexGrow: 1 }} key={task.prdctClsfcNoNm}>
    <Card variant='outlined'>
      <CardContent>
        <Typography component='div'>기관명 : {task.dminsttNm}</Typography>
        <Typography component='div'>사업명 : {task.bidNtceNm}</Typography>
        <Typography component='div'>접수등록 : {task.bidNtceDt}</Typography>
        <Typography component='div'>마감 : {task.bidClseDt}</Typography>
        <Typography component='div'>마감 : {task.opninRgstClseDt}</Typography>
        <Typography component='div'>파일링크1 : <Button><Link href={task.ntceSpecDocUrl1}>다운로드 링크</Link></Button></Typography>
      </CardContent>
    </Card>
  </Box>
)

export default BoneTask