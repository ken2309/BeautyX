import TimePicker from '../../../components/TimePicker'

function OrgTime(props: any) {
      const { setDataBook, dataBook, setOpen, open } = props;
      const onChangeChooseTime = (e: string) => {
            setOpen({ ...open, oTime: false })
            setDataBook({
                  ...dataBook,
                  time: e
            })
      }
      return (
            <div
                  style={
                        open.oTime === true ?
                              { opacity: 1, top: '50px', visibility: 'visible' }
                              :
                              { opacity: 0, top: '80px', visibility: 'hidden' }
                  }
                  className="ser-choose-time"
            >
                  <TimePicker
                        onChange={(e) => onChangeChooseTime(e)}
                  />
            </div>
      );
}

export default OrgTime;