import { useState } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import { DocLayout } from '../../Component'
import tomorrowNightEighties from 'react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow-night-eighties'
// import { ReactComponent as ArrowLeft } from '../../Component/Icons/arrow-left.svg'
// import { ReactComponent as ArrowRight } from '../../Component/Icons/arrow-right.svg'
import {
	singleExampleStr,
	singlePersianExampleStr,
	rangeExampleStr,
	multiExampleStr,
	singleTimeExampleStr,
	displayingOptionExampleStr,
	callbackApiExampleStr,
	minMaxExampleStr,
	disabledExampleStr,
	singleInitValueExampleStr,
	rangeInitValueEExampleStr,
	multiInitialValueExampleStr,
	customCalender,
	customCalenderStyle,
	withoutInputStr,
	singleUpdateInitValueExampleStr,
	autoCloseStr
} from '../../Constant/sampleString'
import dynamic from 'next/dynamic'
const Light = dynamic(() => import('react-syntax-highlighter'), {
	ssr: false
})
const App = () => {
	const [singleExample, setSingleExample] = useState(null)
	const [singleInitValueExample, setSingleInitValueExample] = useState({
		year: 2019,
		month: 3,
		day: 20
	})
	const [singleInitValueExampleAsync, setSingleInitValueExampleAsync] =
		useState({ year: 2010, month: 3, day: 22 })

	const [singlePersianExample, setSinglePersianExample] = useState(null)
	const [rangeExample, setRangeExample] = useState(null)
	const [rangeInitValueExample, setRangeInitValueExample] = useState(null)
	const [multiExample, setMultiExample] = useState(null)
	const [multiInitialValueExample, setMultiInitialValueExample] = useState(null)
	const [singleTimeExample, setSingleTimeExample] = useState(null)
	const [displayingOption, setDisplayingOption] = useState(null)
	const [callBackApi, setCallBackApi] = useState(null)
	const [open, setOpen] = useState(0)
	const [close, setClose] = useState(0)
	const [change, setChange] = useState(0)
	const handleCalendarChange = (newDate: any) => {
		console.log(newDate)
		console.log('Calendar changed')
		setChange(change + 1)
	}
	const handleCalendarClose = () => {
		setClose(close + 1)
		console.log('Calendar closed')
	}
	const handleCalendarOpen = () => {
		setOpen(open + 1)
		console.log('Calendar opened')
	}

	const [minMax, setMinMax] = useState(null)
	const maxDate = {
		year: 2016,
		month: 6,
		day: 23
	}
	const minDate = {
		year: 2012,
		month: 5,
		day: 2
	}

	const [disabledDate, setDisabledDate] = useState(null)
	const disabledDatesList = [
		{
			year: 2016,
			month: 6,
			day: 15
		},
		{
			year: 2016,
			month: 6,
			day: 12
		},
		{
			year: 2016,
			month: 6,
			day: 10
		}
	]
	const [withoutInput, setWithoutInput] = useState(null)
	const [autoCloseFalse, setAutoCloseFalse] = useState(null)
	const [customIcons, setCustomIcons] = useState(null)
	const updateInitValue = () => {
		setSingleInitValueExampleAsync({
			year: 2021,
			month: 12,
			day: 25
		})
	}

	return (
		<DocLayout>
			<div className='mb-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='selectSingleDay'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Select single day
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 lg:w-3/4 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{singleExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker onChange={(date) => setSingleExample(date)} />
						<pre>{JSON.stringify(singleExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='SingleDayWithInitialDate'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Single day with initial date
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{singleInitValueExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							initValue={singleInitValueExample}
							onChange={setSingleInitValueExample}
						/>
						<pre>{JSON.stringify(singleInitValueExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='updateInitialDate'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Update initial date
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{singleUpdateInitValueExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<button onClick={updateInitValue} className='btn rounded-0 mb-2'>
							Update init value
						</button>
						<DtPicker
							initValue={singleInitValueExampleAsync}
							onChange={setSingleInitValueExampleAsync}
						/>
						<pre>{JSON.stringify(singleInitValueExampleAsync, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='selectSinglePersian(Jalali)day'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Select single Jalali day
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{singlePersianExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							onChange={setSinglePersianExample}
							local='fa'
							showWeekend
						/>
						<pre>{JSON.stringify(singlePersianExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='selectAListOfDaysBetweenTwoDays'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Select a list of days between two days
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{rangeExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker onChange={setRangeExample} type='range' />
						<pre>{JSON.stringify(rangeExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='rangeOfDaysWithInitialDate'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Range of days with initial date
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{rangeInitValueEExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							initValue={{
								from: { year: 2012, month: 5, day: 2 },
								to: { year: 2012, month: 5, day: 23 }
							}}
							onChange={setRangeInitValueExample}
							type='range'
						/>
						<pre>{JSON.stringify(rangeInitValueExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='selectMultiDays'
					className='text-2xl font-bold mb-4  scroll-offset'
				>
					Select multi days
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{multiExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker onChange={setMultiExample} type='multi' />
						<pre>{JSON.stringify(multiExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='multiDaysWithInitialDate'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Multi days with initial date
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{multiInitialValueExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							initValue={[
								{
									year: 2012,
									month: 5,
									day: 29,
									hour: 18,
									minute: 11
								},
								{
									year: 2012,
									month: 5,
									day: 2,
									hour: 18,
									minute: 11
								},
								{
									year: 2012,
									month: 6,
									day: 3,
									hour: 18,
									minute: 11
								}
							]}
							onChange={setMultiInitialValueExample}
							type='multi'
						/>
						<pre>{JSON.stringify(multiInitialValueExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='singleDayWithTime'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Single day with time
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{singleTimeExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker onChange={setSingleTimeExample} withTime showTimeInput />
						<pre>{JSON.stringify(singleTimeExample, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='showWeekendClearBtnAndTodayBtnOptions'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					ShowWeekend,year list style, clearBtn and todayBtn options
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{displayingOptionExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							onChange={setDisplayingOption}
							showWeekend
							clearBtn
							todayBtn
							yearListStyle='list'
						/>
						<pre>{JSON.stringify(displayingOption, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='openCloseAndChangeCallbackApi'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Open, close and change callback api{' '}
					<span className='text-sm font-normal'>
						(<span className='font-bold text-red-400'>Note:</span> to use
						onCalenderChange you should pass initValue or you can use useEffect
						to watch your date changing)
					</span>
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{callbackApiExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<span className='block'>open: {open}</span>
						<span className='block'>change: {change}</span>
						<span className='block'>close: {close}</span>
						<DtPicker
							type='single'
							initValue={callBackApi}
							onChange={setCallBackApi}
							onCalenderChange={handleCalendarChange}
							onCalenderShow={handleCalendarOpen}
							onCalenderHide={handleCalendarClose}
						/>
						<pre>{JSON.stringify(callBackApi, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='setMinimumAndMaximumDate'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Set minimum and maximum date
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{minMaxExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							onChange={setMinMax}
							minDate={minDate}
							maxDate={maxDate}
						/>
						<pre>{JSON.stringify(minMax, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3
					id='setAListOfDisabledDates'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Set a list of disabled dates
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{disabledExampleStr}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							onChange={setDisabledDate}
							disabledDates={disabledDatesList}
							minDate={minDate}
							maxDate={maxDate}
						/>
						<pre>{JSON.stringify(disabledDate, null, 2)}</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3 id='AutoClose' className='text-2xl font-bold mb-4 scroll-offset'>
					AutoClose : false
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{autoCloseStr}
						</Light>
					</div>
					<div className='w-2/2 xl:w-1/2'>
						<div className='mt-4'>
							<DtPicker onChange={setAutoCloseFalse} autoClose={false} />
						</div>
						<pre className='mt-4'>
							{JSON.stringify(autoCloseFalse, null, 2)}
						</pre>
					</div>
				</div>
			</div>
			<div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
				<h3 id='WithoutInput' className='text-2xl font-bold mb-4 scroll-offset'>
					Without input
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{withoutInputStr}
						</Light>
					</div>
					<div className='w-2/2 xl:w-1/2'>
						<div className='mt-4'>
							<DtCalendar onChange={setWithoutInput} />
						</div>
						<pre className='mt-4'>{JSON.stringify(withoutInput, null, 2)}</pre>
					</div>
				</div>
			</div>

			<div className='my-10 pb-4'>
				<h3
					id='CustomCalender'
					className='text-2xl font-bold mb-4 scroll-offset'
				>
					Custom calendar: icons - input placeholder - styles
				</h3>
				<div className='block xl:flex '>
					<div className='w-2/2 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='javascript'
						>
							{customCalender}
						</Light>
						<br />
						<h4 className='text-lg'>Style</h4>
						<Light
							className='rounded'
							style={tomorrowNightEighties}
							language='css'
						>
							{customCalenderStyle}
						</Light>
					</div>
					<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
						<DtPicker
							onChange={setCustomIcons}
							// NextBtnIcon={ArrowRight}
							// PreviousBtnIcon={ArrowLeft}
							placeholder='select date'
							fromLabel='From date'
							toLabel='To date'
							type='range'
							inputClass='custom-input'
							headerClass='custom-header'
							daysClass='custom-days'
						/>
						<pre>{JSON.stringify(customIcons, null, 2)}</pre>
					</div>
				</div>
			</div>
		</DocLayout>
	)
}

export default App
