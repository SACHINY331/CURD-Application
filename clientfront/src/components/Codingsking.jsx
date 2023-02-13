

import { Box, Typography, styled } from '@mui/material';

import OIP from '../Assets/Images/OIP.jpg';
import OIP2 from '../Assets/Images/OIP2.jpg'

const Header = styled(Box)`
    margin: 50px;
    & > div {
        margin-top: 50px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: '100%'
});

const Codingsking= () => {

    return (
        <Header>
            <Typography variant="h4">Codings king</Typography>
            <Box style={{display: 'flex'}}>
                <Image src={OIP} />
               
            </Box>
        </Header>
    )
}

export default Codingsking;