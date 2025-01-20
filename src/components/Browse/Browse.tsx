import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import img1 from "../../assets/browse-1.png"
import img2 from "../../assets/browse-2.png"
import img3 from "../../assets/browse-3.png"
import img4 from "../../assets/browse-4.png"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Browse = () => {
  return (
    <section className="pt-20">
      <div className="container">
        <div className="p-[64px] bg-[#F0F0F0] rounded-[40px]">
          <div className="text-center">
          <h3 className="text-[48px] integral font-extrabold">BROWSE BY dress STYLE</h3>
          </div>
          <Box sx={{ width: 1, mt: 6 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: 2,
              }}
            >
              <Box sx={{ gridColumn: "span 4" }}>
                <Item className="w-full flex justify-end" sx={{ borderRadius: "20px", padding: "0" }}>
                    <img src={img1} alt="" className="object-contain"/>
                </Item>
              </Box>
              <Box sx={{ gridColumn: "span 8" }}>
                <Item className="w-full flex justify-end" sx={{ borderRadius: "20px", padding: "0" }}>
                    <img src={img2} alt="" />
                </Item>
              </Box>
              <Box sx={{ gridColumn: "span 8" }}>
                <Item className="w-full flex justify-end" sx={{ borderRadius: "20px", padding: "0" }}>
                    <img src={img3} alt="" />
                </Item>
              </Box>
              <Box sx={{ gridColumn: "span 4" }}>
                <Item className="w-full flex justify-end" sx={{ borderRadius: "20px", padding: "0" }}>
                    <img src={img4} alt="" />
                </Item>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default Browse;
