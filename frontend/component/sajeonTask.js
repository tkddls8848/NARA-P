import Link from 'next/link'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid, Paper } from '@mui/material';

const SajeonTask = ({task}) => {
  return (
      <Box sx={{ flexGrow: 1 }} key={task.prdctClsfcNoNm}>
        <Card variant='outlined'>
          <CardContent>
            <Typography component='div'>유형 : {task.bsnsDivNm}</Typography>
            <Typography component='div'>기관명 : {task.rlDminsttNm}</Typography>
            <Typography component='div'>사업명 : {task.prdctClsfcNoNm}</Typography>
            <Typography component='div'>접수등록 : {task.rcptDt}</Typography>
            <Typography component='div'>마감 : {task.opninRgstClseDt}</Typography>
            <Typography component='div'>배정예산 : {task.bfSpecRgstNo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Typography>
            <Typography component='div'>파일링크1 : <Link href={task.specDocFileUrl1}>다운로드 링크</Link></Typography>
          </CardContent>
        </Card>
      </Box>
  )
}

export default SajeonTask