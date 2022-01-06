import Link from 'next/link'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BoneTask = ({task}) => (
  <div key={task.dminsttNm}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="body2">
            기관명 : {task.dminsttNm}
            </Typography>
            <Typography variant="body2">
            사업명 : {task.bidNtceNm}
            </Typography>
            <Typography variant="body2">
            접수등록 : {task.bidNtceDt}
            </Typography>
            <Typography variant="body2">
            마감 : {task.bidClseDt}
            </Typography>
            <Typography variant="body2">
            파일링크1 : <Button><Link href={task.ntceSpecDocUrl1}>다운로드 링크</Link></Button>
            </Typography>
          </CardContent>
        </Card>
  </div>
)

export default BoneTask